import { ValidateIf, IsString, IsNotEmpty } from 'class-validator';

export class EditCommentDto {
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.message)
  message: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.author)
  author: string;
}
