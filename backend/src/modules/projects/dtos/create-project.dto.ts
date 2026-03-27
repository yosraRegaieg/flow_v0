import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ProjectTemplate } from '../../../entities/project.entity';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ProjectTemplate)
  template?: ProjectTemplate;

  @IsOptional()
  @IsString()
  color?: string;
}
