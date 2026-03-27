import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, Index } from 'typeorm';
import { ProjectMember } from './project-member.entity';
import { Sprint } from './sprint.entity';
import { Task } from './task.entity';
import { Document } from './document.entity';
import { ActivityLog } from './activity-log.entity';

export enum ProjectTemplate {
  SCRUM = 'scrum',
  KANBAN = 'kanban',
}

export enum ProjectStatus {
  ACTIVE = 'active',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

@Entity('projects')
@Index(['code'], { unique: true })
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: ProjectTemplate, default: ProjectTemplate.SCRUM })
  template: ProjectTemplate;

  @Column({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.ACTIVE })
  status: ProjectStatus;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  color: string;

  @Column({ type: 'simple-json', nullable: true })
  settings: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ProjectMember, (member) => member.project, { cascade: true })
  members: ProjectMember[];

  @OneToMany(() => Sprint, (sprint) => sprint.project, { cascade: true })
  sprints: Sprint[];

  @OneToMany(() => Task, (task) => task.project, { cascade: true })
  tasks: Task[];

  @OneToMany(() => Document, (doc) => doc.project, { cascade: true })
  documents: Document[];

  @OneToMany(() => ActivityLog, (log) => log.project, { cascade: true })
  activityLogs: ActivityLog[];
}
