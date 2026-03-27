import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProjectMember } from './project-member.entity';
import { Task } from './task.entity';
import { Comment } from './comment.entity';
import { ActivityLog } from './activity-log.entity';

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  TEAM_MEMBER = 'team_member',
  CLIENT = 'client',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.TEAM_MEMBER })
  role: UserRole;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  department: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ProjectMember, (member) => member.user, { cascade: true })
  projectMembers: ProjectMember[];

  @OneToMany(() => Task, (task) => task.assignee, { cascade: false })
  assignedTasks: Task[];

  @OneToMany(() => Comment, (comment) => comment.author, { cascade: true })
  comments: Comment[];

  @OneToMany(() => ActivityLog, (log) => log.user, { cascade: true })
  activityLogs: ActivityLog[];
}
