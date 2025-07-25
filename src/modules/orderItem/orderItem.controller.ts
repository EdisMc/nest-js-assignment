import { BaseController } from 'src/shared/controller/base.controller';

import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { OrderItem } from './orderItem.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from './orderItem.schema';
import { OrderItemService } from './orderItem.service';

@ApiTags('OrderItems')
@ApiBearerAuth('Authorization')
@Controller('order-items')
export class OrderItemController extends BaseController<
  OrderItem,
  CreateOrderItemDto,
  UpdateOrderItemDto
> {
  constructor(protected readonly orderItemService: OrderItemService) {
    super(orderItemService);
  }

  @Post()
  @ApiBody({ type: CreateOrderItemDto })
  override create(@Body() dto: CreateOrderItemDto) {
    return super.create(dto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateOrderItemDto })
  override update(@Param('id') id: string, @Body() dto: UpdateOrderItemDto) {
    return super.update(id, dto);
  }
}
