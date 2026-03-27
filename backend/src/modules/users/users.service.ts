import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.usersRepository.find({
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'department', 'isActive', 'createdAt'],
    });
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'department', 'isActive', 'createdAt'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateProfile(id: string, updateData: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }

  async deleteUser(id: string) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}
