import { BaseService } from 'src/shared/service/base.service';
import { Repository } from 'typeorm';

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { OrderItem } from './orderItem.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from './orderItem.schema';

@Injectable()
export class OrderItemService extends BaseService<OrderItem> {
  constructor(@InjectRepository(OrderItem) repo: Repository<OrderItem>) {
    super(repo, 'OrderItem');
  }

  async create(dto: CreateOrderItemDto): Promise<OrderItem> {
    const existing = await this.repo.findOne({
      where: { productId: dto.productId, orderId: dto.orderId },
    });
    if (existing)
      throw new ConflictException(`Product already exists in this order`);
    return super.create(dto);
  }

  async update(id: string, dto: UpdateOrderItemDto): Promise<OrderItem> {
    return super.update(id, dto);
  }
}
