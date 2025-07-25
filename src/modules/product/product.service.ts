import { BaseService } from 'src/shared/service/base.service';
import { Repository } from 'typeorm';

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProductDto, UpdateProductDto } from './prdouct.schema';
import { Product } from './product.entity';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(@InjectRepository(Product) repo: Repository<Product>) {
    super(repo, 'Product');
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const existing = await this.repo.findOne({
      where: { sku: dto.sku, companyId: dto.companyId },
    });
    if (existing)
      throw new ConflictException(
        `Product with SKU '${dto.sku}' already exists for this company`,
      );
    return super.create(dto);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.getById(id);
    if (dto.sku && dto.sku !== product.sku) {
      const existing = await this.repo.findOne({
        where: { sku: dto.sku, companyId: product.companyId },
      });
      if (existing)
        throw new ConflictException(
          `Product with SKU '${dto.sku}' already exists for this company`,
        );
    }
    return super.update(id, dto);
  }
}
