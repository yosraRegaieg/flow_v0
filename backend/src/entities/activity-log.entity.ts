import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Task } from './task.entity';

export enum ActivityAction {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
  COMMENTED = 'commented',
  ASSIGNED = 'assigned',
  STATUS_CHANGED = 'status_changed',
  PRIORITY_CHANGED = 'priority_changed',
  MOVED = 'moved',
  FILE_UPLOADED = 'file_uploaded',
  FILE_DELETED = 'file_deleted',
}

@Entity('activity_logs')
export class ActivityLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ActivityAction })
  action: ActivityAction;

  @Column()
  entityType: string;

  @Column()
  entityId: string;

  @Column({ type: 'simple-json', nullable: true })
  changes: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.activityLogs, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Project, (project) => project.activityLogs, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  project: Project;

  @ManyToOne(() => Task, (task) => task.activityLogs, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  task: Task;
}
