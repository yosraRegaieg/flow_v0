import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from '../../entities/project.entity';
import { ProjectMember, ProjectMemberRole } from '../../entities/project-member.entity';
import { User } from '../../entities/user.entity';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { AddMemberDto } from './dtos/add-member.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(ProjectMember)
    private projectMembersRepository: Repository<ProjectMember>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: string) {
    const project = this.projectsRepository.create({
      ...createProjectDto,
      status: ProjectStatus.ACTIVE,
    });

    const savedProject = await this.projectsRepository.save(project);

    // Add creator as owner
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    await this.projectMembersRepository.save({
      project: savedProject,
      user,
      role: ProjectMemberRole.OWNER,
      joinedAt: new Date(),
    });

    return this.findOne(savedProject.id);
  }

  async findAll(skip = 0, take = 10) {
    const [data, total] = await this.projectsRepository.findAndCount({
      relations: ['members', 'members.user'],
      skip,
      take,
      order: { createdAt: 'DESC' },
    });

    return { data, total, skip, take };
  }

  async findOne(id: string) {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['members', 'members.user', 'sprints', 'tasks'],
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id);
    Object.assign(project, updateProjectDto);
    return this.projectsRepository.save(project);
  }

  async delete(id: string) {
    const project = await this.findOne(id);
    return this.projectsRepository.remove(project);
  }

  async addMember(projectId: string, addMemberDto: AddMemberDto) {
    const project = await this.findOne(projectId);
    const user = await this.usersRepository.findOne({ where: { id: addMemberDto.userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingMember = await this.projectMembersRepository.findOne({
      where: { project: { id: projectId }, user: { id: addMemberDto.userId } },
    });

    if (existingMember) {
      throw new BadRequestException('User is already a member of this project');
    }

    const member = this.projectMembersRepository.create({
      project,
      user,
      role: addMemberDto.role || ProjectMemberRole.MEMBER,
      joinedAt: new Date(),
    });

    return this.projectMembersRepository.save(member);
  }

  async removeMember(projectId: string, userId: string) {
    const member = await this.projectMembersRepository.findOne({
      where: { project: { id: projectId }, user: { id: userId } },
    });

    if (!member) {
      throw new NotFoundException('Member not found in this project');
    }

    return this.projectMembersRepository.remove(member);
  }

  async getMembers(projectId: string) {
    return this.projectMembersRepository.find({
      where: { project: { id: projectId } },
      relations: ['user'],
    });
  }
}
