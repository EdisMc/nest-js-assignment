import { BaseService } from 'src/shared/service/base.service';
import { Repository } from 'typeorm';

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Invoice } from './invoice.entity';
import { CreateInvoiceDto, UpdateInvoiceDto } from './invoice.schema';

@Injectable()
export class InvoiceService extends BaseService<Invoice> {
  constructor(@InjectRepository(Invoice) repo: Repository<Invoice>) {
    super(repo, 'Invoice');
  }

  async create(dto: CreateInvoiceDto): Promise<Invoice> {
    const existing = await this.repo.findOne({
      where: { invoiceNumber: dto.invoiceNumber },
    });
    if (existing)
      throw new ConflictException(
        `Invoice with number '${dto.invoiceNumber}' already exists`,
      );
    return super.create(dto);
  }

  async update(id: string, dto: UpdateInvoiceDto): Promise<Invoice> {
    const invoice = await this.getById(id);
    if (dto.invoiceNumber && dto.invoiceNumber !== invoice.invoiceNumber) {
      const existing = await this.repo.findOne({
        where: { invoiceNumber: dto.invoiceNumber },
      });
      if (existing)
        throw new ConflictException(
          `Invoice with number '${dto.invoiceNumber}' already exists`,
        );
    }
    return super.update(id, dto);
  }
}
