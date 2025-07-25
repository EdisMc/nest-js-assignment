import { BaseService } from 'src/shared/service/base.service';
import { Repository } from 'typeorm';

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Company } from './company.entity';
import { CreateCompanyDto, UpdateCompanyDto } from './company.schema';

@Injectable()
export class CompanyService extends BaseService<Company> {
  constructor(@InjectRepository(Company) repo: Repository<Company>) {
    super(repo, 'Company');
  }

  async create(dto: CreateCompanyDto): Promise<Company> {
    const existing = await this.repo.findOne({ where: { name: dto.name } });
    if (existing)
      throw new ConflictException(`Company with name '${dto.name}' exists!`);
    return super.create(dto);
  }

  async update(id: string, dto: UpdateCompanyDto): Promise<Company> {
    const company = await this.getById(id);
    if (dto.name && dto.name !== company.name) {
      const existing = await this.repo.findOne({ where: { name: dto.name } });
      if (existing)
        throw new ConflictException(`Company with name '${dto.name}' exists!`);
    }
    return super.update(id, dto);
  }
}
