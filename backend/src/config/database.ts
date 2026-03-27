import { DataSourceOptions } from 'typeorm';
import { User } from '../entities/user.entity';
import { Project } from '../entities/project.entity';
import { Sprint } from '../entities/sprint.entity';
import { Task } from '../entities/task.entity';
import { Comment } from '../entities/comment.entity';
import { Document } from '../entities/document.entity';
import { ActivityLog } from '../entities/activity-log.entity';
import { ProjectMember } from '../entities/project-member.entity';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'projectflow',
  password: process.env.DB_PASSWORD || 'projectflow123',
  database: process.env.DB_DATABASE || 'projectflow',
  entities: [User, Project, Sprint, Task, Comment, Document, ActivityLog, ProjectMember],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.NODE_ENV === 'development',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};
