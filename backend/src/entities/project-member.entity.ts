import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

export enum ProjectMemberRole {
  OWNER = 'owner',
  LEAD = 'lead',
  MEMBER = 'member',
  VIEWER = 'viewer',
}

@Entity('project_members')
@Index(['project', 'user'], { unique: true })
export class ProjectMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.members, { onDelete: 'CASCADE' })
  @JoinColumn()
  project: Project;

  @ManyToOne(() => User, (user) => user.projectMembers, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ type: 'enum', enum: ProjectMemberRole, default: ProjectMemberRole.MEMBER })
  role: ProjectMemberRole;

  @Column({ nullable: true })
  joinedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
