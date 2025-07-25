import { BaseController } from 'src/shared/controller/base.controller';

import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { Warehouse } from './warehouse.entity';
import { CreateWarehouseDto, UpdateWarehouseDto } from './warehouse.schema';
import { WarehouseService } from './warehouse.service';

@ApiTags('Warehouses')
@ApiBearerAuth('Authorization')
@Controller('warehouses')
export class WarehouseController extends BaseController<
  Warehouse,
  CreateWarehouseDto,
  UpdateWarehouseDto
> {
  constructor(protected readonly warehouseService: WarehouseService) {
    super(warehouseService);
  }

  @Post()
  @ApiBody({ type: CreateWarehouseDto })
  override create(@Body() dto: CreateWarehouseDto) {
    return super.create(dto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateWarehouseDto })
  override update(@Param('id') id: string, @Body() dto: UpdateWarehouseDto) {
    return super.update(id, dto);
  }
}
