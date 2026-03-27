import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Project } from './project.entity';
import { Sprint } from './sprint.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Document } from './document.entity';
import { ActivityLog } from './activity-log.entity';

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  IN_REVIEW = 'in_review',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority: TaskPriority;

  @Column({ type: 'int', default: 0 })
  storyPoints: number;

  @Column({ nullable: true })
  dueDate: Date;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ type: 'varchar', array: true, default: [] })
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE' })
  @JoinColumn()
  project: Project;

  @ManyToOne(() => Sprint, (sprint) => sprint.tasks, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn()
  sprint: Sprint;

  @ManyToOne(() => User, (user) => user.assignedTasks, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn()
  assignee: User;

  @OneToMany(() => Comment, (comment) => comment.task, { cascade: true })
  comments: Comment[];

  @OneToMany(() => Document, (doc) => doc.task, { cascade: false })
  attachments: Document[];

  @OneToMany(() => ActivityLog, (log) => log.task, { cascade: true })
  activityLogs: ActivityLog[];
}
