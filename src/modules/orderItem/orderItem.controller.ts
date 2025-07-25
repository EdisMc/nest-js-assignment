import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BaseController } from 'src/shared/controller/base.controller';

import {
	Body,
	Controller,
	Delete,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { OrderItem } from './orderItem.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from './orderItem.schema';
import { OrderItemService } from './orderItem.service';

@ApiTags('OrderItems')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles('OWNER', 'OPERATOR')
  @ApiBody({ type: CreateOrderItemDto })
  override create(@Body() dto: CreateOrderItemDto) {
    return super.create(dto);
  }

  @Put(':id')
  @Roles('OWNER', 'OPERATOR')
  @ApiBody({ type: UpdateOrderItemDto })
  override update(@Param('id') id: string, @Body() dto: UpdateOrderItemDto) {
    return super.update(id, dto);
  }

  @Delete(':id/soft')
  @Roles('OWNER', 'OPERATOR')
  override softDelete(@Param('id') id: string) {
    return super.softDelete(id);
  }

  @Delete(':id/hard')
  @Roles('OWNER')
  override hardDelete(@Param('id') id: string) {
    return super.hardDelete(id);
  }
}
