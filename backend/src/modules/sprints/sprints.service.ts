import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sprint } from '../../entities/sprint.entity';
import { Project } from '../../entities/project.entity';

@Injectable()
export class SprintsService {
  constructor(
    @InjectRepository(Sprint)
    private sprintsRepository: Repository<Sprint>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(projectId: string, createSprintDto: any) {
    const project = await this.projectsRepository.findOne({ where: { id: projectId } });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const sprint = this.sprintsRepository.create({
      ...createSprintDto,
      project,
    });

    return this.sprintsRepository.save(sprint);
  }

  async findByProject(projectId: string) {
    return this.sprintsRepository.find({
      where: { project: { id: projectId } },
      relations: ['tasks'],
      order: { startDate: 'DESC' },
    });
  }

  async findOne(id: string) {
    const sprint = await this.sprintsRepository.findOne({
      where: { id },
      relations: ['tasks', 'project'],
    });

    if (!sprint) {
      throw new NotFoundException('Sprint not found');
    }

    return sprint;
  }

  async update(id: string, updateSprintDto: any) {
    const sprint = await this.findOne(id);
    Object.assign(sprint, updateSprintDto);
    return this.sprintsRepository.save(sprint);
  }

  async delete(id: string) {
    const sprint = await this.findOne(id);
    return this.sprintsRepository.remove(sprint);
  }
}
