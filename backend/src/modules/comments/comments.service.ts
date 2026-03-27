import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../entities/comment.entity';
import { Task } from '../../entities/task.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(taskId: string, content: string, userId: string) {
    const task = await this.tasksRepository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const comment = this.commentsRepository.create({
      content,
      task,
      author: user,
    });

    return this.commentsRepository.save(comment);
  }

  async findByTask(taskId: string) {
    return this.commentsRepository.find({
      where: { task: { id: taskId } },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['author', 'task'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async update(id: string, content: string) {
    const comment = await this.findOne(id);
    comment.content = content;
    return this.commentsRepository.save(comment);
  }

  async delete(id: string) {
    const comment = await this.findOne(id);
    return this.commentsRepository.remove(comment);
  }
}
