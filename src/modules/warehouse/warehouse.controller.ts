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
import { Warehouse } from './warehouse.entity';
import { CreateWarehouseDto, UpdateWarehouseDto } from './warehouse.schema';
import { WarehouseService } from './warehouse.service';

@ApiTags('Warehouses')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles('OWNER', 'OPERATOR')
  @ApiBody({ type: CreateWarehouseDto })
  override create(@Body() dto: CreateWarehouseDto) {
    return super.create(dto);
  }

  @Put(':id')
  @Roles('OWNER', 'OPERATOR')
  @ApiBody({ type: UpdateWarehouseDto })
  override update(@Param('id') id: string, @Body() dto: UpdateWarehouseDto) {
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
