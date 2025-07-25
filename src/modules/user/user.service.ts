import { BaseService } from 'src/shared/service/base.service';
import { Repository } from 'typeorm';

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.schema';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo, 'User');
  }

  async getByEmail(email: string, withPassword = false) {
    return this.repo.findOne({
      where: { email },
      select: withPassword
        ? ['id', 'email', 'password', 'name', 'role', 'companyId']
        : ['id', 'email', 'name', 'role', 'companyId'],
    });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.repo.findOne({ where: { email: dto.email } });
    if (existing)
      throw new ConflictException(
        `User with email '${dto.email}' already exists`,
      );
    return super.create(dto);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.getById(id);
    if (dto.email && dto.email !== user.email) {
      const existing = await this.repo.findOne({ where: { email: dto.email } });
      if (existing)
        throw new ConflictException(
          `User with email '${dto.email}' already exists`,
        );
    }
    return super.update(id, dto);
  }

  async softDelete(id: string) {
    return super.softDelete(id);
  }

  async hardDelete(id: string) {
    return super.hardDelete(id);
  }
}
