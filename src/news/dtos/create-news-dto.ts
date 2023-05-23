import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @ValidateIf((o) => o.countView)
  countView: number;

  @IsNotEmpty()
  userId: string;

  @ValidateIf((o) => o.cover)
  cover: string;
}
