import { BaseController } from 'src/shared/controller/base.controller';

import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { Order } from './order.entity';
import { CreateOrderDto, UpdateOrderDto } from './order.schema';
import { OrderService } from './order.service';

@ApiTags('Orders')
@ApiBearerAuth('Authorization')
@Controller('orders')
export class OrderController extends BaseController<
  Order,
  CreateOrderDto,
  UpdateOrderDto
> {
  constructor(protected readonly orderService: OrderService) {
    super(orderService);
  }

  @Post()
  @ApiBody({ type: CreateOrderDto })
  override create(@Body() dto: CreateOrderDto) {
    return super.create(dto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateOrderDto })
  override update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return super.update(id, dto);
  }
}
