import { BaseService } from 'src/shared/service/base.service';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Order } from './order.entity';
import { CreateOrderDto, UpdateOrderDto } from './order.schema';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(@InjectRepository(Order) repo: Repository<Order>) {
    super(repo, 'Order');
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    return super.create(dto);
  }

  async update(id: string, dto: UpdateOrderDto): Promise<Order> {
    return super.update(id, dto);
  }
}
