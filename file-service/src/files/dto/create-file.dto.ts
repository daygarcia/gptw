import { IsDate, IsDecimal, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsDate()
  @IsNotEmpty()
  hiringDate: Date;

  @IsNumber()
  @IsNotEmpty()
  salary: number;
}

