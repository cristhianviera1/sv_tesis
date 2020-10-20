import { IsNotEmpty } from 'class-validator';

export default class DeleteEmployeeDto{
  @IsNotEmpty()
  branch_id: string;

  @IsNotEmpty()
  user_id: string;
}