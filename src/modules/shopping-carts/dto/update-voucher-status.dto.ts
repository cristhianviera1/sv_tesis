import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusTypeOrder, StatusVoucherType } from '../schema/shopping-cart.schema';

export default class UpdateVoucherStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  status: StatusVoucherType;

  @ApiProperty()
  delivery_status: StatusTypeOrder;
}
