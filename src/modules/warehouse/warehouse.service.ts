import { BaseService } from 'src/shared/service/base.service';
import { Repository } from 'typeorm';

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Warehouse } from './warehouse.entity';
import { CreateWarehouseDto, UpdateWarehouseDto } from './warehouse.schema';

@Injectable()
export class WarehouseService extends BaseService<Warehouse> {
  constructor(@InjectRepository(Warehouse) repo: Repository<Warehouse>) {
    super(repo, 'Warehouse');
  }

  async create(dto: CreateWarehouseDto): Promise<Warehouse> {
    const existing = await this.repo.findOne({
      where: { name: dto.name, companyId: dto.companyId },
    });
    if (existing)
      throw new ConflictException(
        `Warehouse with name '${dto.name}' already exists for this company`,
      );
    return super.create(dto);
  }

  async update(id: string, dto: UpdateWarehouseDto): Promise<Warehouse> {
    const warehouse = await this.getById(id);
    if (dto.name && dto.name !== warehouse.name) {
      const existing = await this.repo.findOne({
        where: { name: dto.name, companyId: warehouse.companyId },
      });
      if (existing)
        throw new ConflictException(
          `Warehouse with name '${dto.name}' already exists for this company`,
        );
    }
    return super.update(id, dto);
  }
}