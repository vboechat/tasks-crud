import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  title: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  description?: string;
}
