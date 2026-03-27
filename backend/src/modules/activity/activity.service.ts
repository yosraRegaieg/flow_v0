import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog, ActivityAction } from '../../entities/activity-log.entity';
import { User } from '../../entities/user.entity';
import { Project } from '../../entities/project.entity';
import { Task } from '../../entities/task.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityLog)
    private activityRepository: Repository<ActivityLog>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async logActivity(logData: {
    action: ActivityAction;
    entityType: string;
    entityId: string;
    userId: string;
    projectId?: string;
    taskId?: string;
    changes?: Record<string, any>;
    description?: string;
  }) {
    const user = await this.usersRepository.findOne({ where: { id: logData.userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const activityLog = this.activityRepository.create({
      action: logData.action,
      entityType: logData.entityType,
      entityId: logData.entityId,
      user,
      changes: logData.changes,
      description: logData.description,
    });

    if (logData.projectId) {
      const project = await this.projectsRepository.findOne({ where: { id: logData.projectId } });
      if (project) {
        activityLog.project = project;
      }
    }

    if (logData.taskId) {
      const task = await this.tasksRepository.findOne({ where: { id: logData.taskId } });
      if (task) {
        activityLog.task = task;
      }
    }

    return this.activityRepository.save(activityLog);
  }

  async getProjectActivity(projectId: string, skip = 0, take = 50) {
    const [data, total] = await this.activityRepository.findAndCount({
      where: { project: { id: projectId } },
      relations: ['user'],
      skip,
      take,
      order: { createdAt: 'DESC' },
    });

    return { data, total, skip, take };
  }

  async getTaskActivity(taskId: string, skip = 0, take = 50) {
    const [data, total] = await this.activityRepository.findAndCount({
      where: { task: { id: taskId } },
      relations: ['user'],
      skip,
      take,
      order: { createdAt: 'DESC' },
    });

    return { data, total, skip, take };
  }
}
