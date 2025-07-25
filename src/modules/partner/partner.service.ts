import { BaseService } from 'src/shared/service/base.service';
import { Repository } from 'typeorm';

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Partner } from './partner.entity';
import { CreatePartnerDto, UpdatePartnerDto } from './partner.schema';

@Injectable()
export class PartnerService extends BaseService<Partner> {
  constructor(@InjectRepository(Partner) repo: Repository<Partner>) {
    super(repo, 'Partner');
  }

  async create(dto: CreatePartnerDto): Promise<Partner> {
    const existing = await this.repo.findOne({
      where: { name: dto.name, companyId: dto.companyId },
    });
    if (existing)
      throw new ConflictException(
        `Partner with name '${dto.name}' already exists for this company`,
      );
    return super.create(dto);
  }

  async update(id: string, dto: UpdatePartnerDto): Promise<Partner> {
    const partner = await this.getById(id);
    if (dto.name && dto.name !== partner.name) {
      const existing = await this.repo.findOne({
        where: { name: dto.name, companyId: partner.companyId },
      });
      if (existing)
        throw new ConflictException(
          `Partner with name '${dto.name}' already exists for this company`,
        );
    }
    return super.update(id, dto);
  }
}
