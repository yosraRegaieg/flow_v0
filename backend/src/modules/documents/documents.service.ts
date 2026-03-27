import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document, DocumentType } from '../../entities/document.entity';
import { Project } from '../../entities/project.entity';
import { Task } from '../../entities/task.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createDocumentDto: any, userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    const document = this.documentsRepository.create({
      ...createDocumentDto,
      uploadedBy: user,
      type: DocumentType.FILE,
    });

    if (createDocumentDto.projectId) {
      const project = await this.projectsRepository.findOne({ where: { id: createDocumentDto.projectId } });
      if (project) {
        document.project = project;
      }
    }

    if (createDocumentDto.taskId) {
      const task = await this.tasksRepository.findOne({ where: { id: createDocumentDto.taskId } });
      if (task) {
        document.task = task;
      }
    }

    return this.documentsRepository.save(document);
  }

  async findByProject(projectId: string) {
    return this.documentsRepository.find({
      where: { project: { id: projectId } },
      relations: ['uploadedBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByTask(taskId: string) {
    return this.documentsRepository.find({
      where: { task: { id: taskId } },
      relations: ['uploadedBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const document = await this.documentsRepository.findOne({
      where: { id },
      relations: ['uploadedBy', 'project', 'task'],
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async update(id: string, updateDocumentDto: any) {
    const document = await this.findOne(id);
    Object.assign(document, updateDocumentDto);
    return this.documentsRepository.save(document);
  }

  async delete(id: string) {
    const document = await this.findOne(id);
    return this.documentsRepository.remove(document);
  }
}
