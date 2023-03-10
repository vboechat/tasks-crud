import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @MaxLength(60)
  title: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  description?: string;
}
