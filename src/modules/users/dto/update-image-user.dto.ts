import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class UpdateImageUserDto {
  @ApiProperty()
  @IsNotEmpty()
  image: string;
}
