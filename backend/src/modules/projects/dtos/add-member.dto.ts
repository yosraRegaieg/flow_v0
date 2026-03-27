import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ProjectMemberRole } from '../../../entities/project-member.entity';

export class AddMemberDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsEnum(ProjectMemberRole)
  role?: ProjectMemberRole;
}
