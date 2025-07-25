import { BaseController } from 'src/shared/controller/base.controller';

import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateProductDto, UpdateProductDto } from './prdouct.schema';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@ApiTags('Products')
@ApiBearerAuth('Authorization')
@Controller('products')
export class ProductController extends BaseController<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(protected readonly productService: ProductService) {
    super(productService);
  }

  @Post()
  @ApiBody({ type: CreateProductDto })
  override create(@Body() dto: CreateProductDto) {
    return super.create(dto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateProductDto })
  override update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return super.update(id, dto);
  }
}
