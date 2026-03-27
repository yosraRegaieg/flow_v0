import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { Project } from '../../entities/project.entity';
import { Sprint } from '../../entities/sprint.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Sprint)
    private sprintsRepository: Repository<Sprint>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(projectId: string, createTaskDto: any) {
    const project = await this.projectsRepository.findOne({ where: { id: projectId } });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const task = this.tasksRepository.create({
      ...createTaskDto,
      project,
    });

    if (createTaskDto.sprintId) {
      const sprint = await this.sprintsRepository.findOne({ where: { id: createTaskDto.sprintId } });
      if (sprint) {
        task.sprint = sprint;
      }
    }

    if (createTaskDto.assigneeId) {
      const assignee = await this.usersRepository.findOne({ where: { id: createTaskDto.assigneeId } });
      if (assignee) {
        task.assignee = assignee;
      }
    }

    return this.tasksRepository.save(task);
  }

  async findByProject(projectId: string) {
    return this.tasksRepository.find({
      where: { project: { id: projectId } },
      relations: ['assignee', 'sprint', 'comments'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['project', 'sprint', 'assignee', 'comments', 'comments.author'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async update(id: string, updateTaskDto: any) {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);

    if (updateTaskDto.assigneeId) {
      const assignee = await this.usersRepository.findOne({ where: { id: updateTaskDto.assigneeId } });
      if (assignee) {
        task.assignee = assignee;
      }
    }

    return this.tasksRepository.save(task);
  }

  async delete(id: string) {
    const task = await this.findOne(id);
    return this.tasksRepository.remove(task);
  }
}
