import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  create(data: Partial<Company>) {
    const company = this.companyRepository.create(data);
    return this.companyRepository.save(company);
  }

  async findAll() {
    try {
      return await this.companyRepository.find();
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  findOne(id: string) {
    return this.companyRepository.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<Company>) {
    await this.companyRepository.update(id, data);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.companyRepository.delete(id);
  }
}
