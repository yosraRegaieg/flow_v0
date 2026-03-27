import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Project } from './project.entity';
import { Task } from './task.entity';

export enum SprintStatus {
  PLANNED = 'planned',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('sprints')
export class Sprint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: SprintStatus, default: SprintStatus.PLANNED })
  status: SprintStatus;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ type: 'int', default: 0 })
  goal: number;

  @Column({ type: 'int', default: 0 })
  velocity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Project, (project) => project.sprints, { onDelete: 'CASCADE' })
  @JoinColumn()
  project: Project;

  @OneToMany(() => Task, (task) => task.sprint, { cascade: false })
  tasks: Task[];
}
