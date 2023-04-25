import { ValidateIf, IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class EditNewsDto {
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.title)
  title: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.description)
  description: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.author)
  author: string;

  @IsNotEmpty()
  @IsNumber()
  @ValidateIf((o) => o.countView && o.countView === '')
  countView: number;

  @ValidateIf((o) => o.cover)
  cover: string;
}
