import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class UploadShoppingCartImageDto {
  @ApiProperty()
  @IsNotEmpty()
  image: string;
}
