import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {
  generateStatusOrderModel,
  ProductDetail,
  ShoppingCart,
  StatusTypeOrderEnum,
  StatusVoucherEnum,
} from './schema/shopping-cart.schema';
import {FilterQuery, Model} from 'mongoose';
import CreateShoppingCartRequestDto from './dto/create-shopping-cart-request.dto';
import {UsersService} from '../users/users.service';
import {ProductsService} from '../products/products.service';
import {User} from '../users/schemas/user.schema';
import {generateUnixTimestamp} from '../../utils/generateUnixTimestamp';
import {CreateShoppingCartDto} from './dto/create-shopping-cart.dto';
import UpdateShoppingCartStatusDto from './dto/update-shopping-cart-status.dto';
import UpdateVoucherStatusDto from './dto/update-voucher-status.dto';
import {Product} from "../products/schema/product.schema";
import {ShoppingSuccessHtml, ShoppingSuccessSubject} from "../../consts/mailer-message";
import {MailerAwsService} from "../../utils/mailerService";

@Injectable()
export class ShoppingCartsService {
  constructor(
      @InjectModel(ShoppingCart.name)
      private ShoppingCartModel: Model<ShoppingCart>,
      private readonly usersService: UsersService,
      private readonly productsService: ProductsService,
      private readonly mailerService: MailerAwsService,
  ) {
  }

  list(conditions: FilterQuery<ShoppingCart>) {
    return this.ShoppingCartModel.find(conditions);
  }

  findOne(conditions: FilterQuery<ShoppingCart>) {
    return this.ShoppingCartModel.findOne(conditions);
  }

  async findById(id: string): Promise<ShoppingCart> {
    const shoppingCart = this.findOne({ _id: id });
    if (!shoppingCart) {
      throw new NotFoundException('No se ha encontrado el carrito con el id proporcionado');
    }
    return shoppingCart;
  }

  async create(createShoppingCartDto: CreateShoppingCartRequestDto, user: User) {
    let total = 0;
    const productsDetail: ProductDetail[] = [];
    for (let i = 0; i < createShoppingCartDto.products.length; i++) {
      const productDetail = createShoppingCartDto.products[i];
      const productEntity = await this.productsService.findById(productDetail.productID);
      if (productEntity.stock < productDetail.quantity) {
        throw new ConflictException(`Lo sentimos no poseemos el suficiente stock de ${productEntity.name}`);
      }
      productsDetail.push({
        product: {...this.productsService.getSafeParameters(productEntity), image: undefined} as Product,
        quantity: productDetail.quantity,
      });
      total += (productEntity.price * productDetail.quantity);
    }
    const newShoppingCart = new CreateShoppingCartDto(
        {...this.usersService.getSafeParameters(user), image: undefined} as User,
        productsDetail,
        generateStatusOrderModel(
            StatusTypeOrderEnum.WAITING_CONTACT,
            generateUnixTimestamp(),
        ),
        {
          statuses: [{
            created_at: generateUnixTimestamp(),
            status: StatusVoucherEnum.WAIGTING_VAUCHER,
          }],
        },
        total,
    );
    this.mailerService.sendMail(
        createShoppingCartDto.user.email,
        ShoppingSuccessSubject,
        ShoppingSuccessHtml(createShoppingCartDto.user.name),
    );
    return await this.ShoppingCartModel.create(newShoppingCart);
  }

  async uploadVoucherImage(image: string, shoppingCart: ShoppingCart) {
    shoppingCart.voucher.image = image;
    shoppingCart.voucher.statuses.push({
      created_at: generateUnixTimestamp(),
      status: StatusVoucherEnum.WAITING_APROVAL,
    });
    shoppingCart.markModified('voucher');
    return await shoppingCart.save();
  }

  async updateStatus(changedBy: User, cart_id: string, updateShoppingCartStatus: UpdateShoppingCartStatusDto) {
    const order = await this.findOne({
      _id: cart_id,
      'status.status': { $nin: [StatusTypeOrderEnum.DELIVERED, StatusTypeOrderEnum.CANCELED] },
      deleted_at: null,
    });
    if (!order.voucher.statuses.some((status) => status.status === StatusVoucherEnum.APPROVED)) {
      throw new ConflictException('No se puede actualizar el estado de entrega hasta que el comprobante del depósito haya sido verificado');
    }
    order.status.push(
        generateStatusOrderModel(
            updateShoppingCartStatus.status,
            generateUnixTimestamp(),
            `La transacción fue actualizada por: ${changedBy.name} ${changedBy.surname}. con email: ${changedBy.email}`,
        ),
    );
    if (updateShoppingCartStatus.status === StatusTypeOrderEnum.CANCELED) {
      order.deleted_at = generateUnixTimestamp();
    }
    order.markModified('status');
    return await order.save();
  }

  async updateVoucherStatus(changedBy: User, shoppingCart: ShoppingCart, updateVoucherStatusDto: UpdateVoucherStatusDto) {
    const canUpdate = shoppingCart.voucher.statuses.some((status) =>
        status.status === StatusVoucherEnum.DENIED || status.status === StatusVoucherEnum.APPROVED,
    );
    if (canUpdate) {
      throw new ConflictException(`El comprobante de pago ya ha sido ${updateVoucherStatusDto.status}`);
    }
    shoppingCart.voucher.statuses.push({
      status: updateVoucherStatusDto.status,
      description: `Actualizado por: ${changedBy.name} ${changedBy.surname}, con email: ${changedBy.email}`,
      created_at: generateUnixTimestamp(),
    });
    if (updateVoucherStatusDto.status === 'aprobado') {
      for (let i = 0; i < shoppingCart.products.length; i++) {
        await this.productsService.changeStock(shoppingCart.products[i].product._id, shoppingCart.products[i].quantity, false);
      }
    }
    shoppingCart.markModified('voucher');
    return await shoppingCart.save();
  }

  async updateDeliveryStatus(changedBy: User, shoppingCart: ShoppingCart, updateVoucherStatusDto: UpdateVoucherStatusDto) {
    const canUpdate = shoppingCart.voucher.statuses[shoppingCart.voucher.statuses.length - 1].status == StatusVoucherEnum.APPROVED;
    if (!canUpdate) {
      throw new ConflictException(`El estado de la entrega no se puede actualizar si el comprobante de pago no ha sido aprobado, o la orden ya ha sido entregada | anulada `);
    }
    shoppingCart.status.push({
      ...generateStatusOrderModel(
          updateVoucherStatusDto.delivery_status,
          generateUnixTimestamp(),
          `Actualizado por ${changedBy.name} ${changedBy.surname} con email: ${changedBy.email}`,
      ),
    });
    if (updateVoucherStatusDto.delivery_status === StatusTypeOrderEnum.CANCELED) {
      for (let i = 0; i < shoppingCart.products.length; i++) {
        await this.productsService.changeStock(shoppingCart.products[i].product._id, shoppingCart.products[i].quantity, true);
      }
    }
    shoppingCart.markModified('status');
    return await shoppingCart.save();
  }
}
