import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusVoucherType } from '../schema/shopping-cart.schema';

export default class UpdateVoucherStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  status: StatusVoucherType;

  @ApiProperty()
  description?: string;
}
