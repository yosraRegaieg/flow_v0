import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';
import { Task } from './task.entity';
import { User } from './user.entity';

export enum DocumentType {
  FILE = 'file',
  LINK = 'link',
  EXTERNAL = 'external',
}

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: DocumentType;

  @Column()
  mimeType: string;

  @Column({ nullable: true })
  size: number;

  @Column()
  filePath: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  url: string;

  @Column({ default: true })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Project, (project) => project.documents, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  project: Project;

  @ManyToOne(() => Task, (task) => task.attachments, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  task: Task;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn()
  uploadedBy: User;
}
