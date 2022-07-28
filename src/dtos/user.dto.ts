import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public username: string;

  @IsNumber()
  public score: number = 0;
}
