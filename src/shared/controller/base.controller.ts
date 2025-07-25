import { DeepPartial, DeleteResult } from 'typeorm';

import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
} from '@nestjs/common';

import { BaseEntity } from '../entity/base.entity';
import { BaseService } from '../service/base.service';

@Controller()
export abstract class BaseController<
  T extends BaseEntity,
  CreateDto extends DeepPartial<T>,
  UpdateDto extends Partial<T>,
> {
  constructor(protected readonly service: BaseService<T>) {}

  @Get()
  getAll(): Promise<T[]> {
    return this.service.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<T> {
    return this.service.getById(id);
  }

  @Post()
  create(@Body() dto: CreateDto): Promise<T> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDto): Promise<T> {
    return this.service.update(id, dto);
  }

  @Delete(':id/soft')
  softDelete(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.softDelete(id);
  }

  @Delete(':id/hard')
  hardDelete(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.hardDelete(id);
  }
}
