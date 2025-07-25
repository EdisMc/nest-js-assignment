import { BaseController } from 'src/shared/controller/base.controller';

import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { Invoice } from './invoice.entity';
import { CreateInvoiceDto, UpdateInvoiceDto } from './invoice.schema';
import { InvoiceService } from './invoice.service';

@ApiTags('Invoices')
@ApiBearerAuth('Authorization')
@Controller('invoices')
export class InvoiceController extends BaseController<
  Invoice,
  CreateInvoiceDto,
  UpdateInvoiceDto
> {
  constructor(protected readonly invoiceService: InvoiceService) {
    super(invoiceService);
  }

  @Post()
  @ApiBody({ type: CreateInvoiceDto })
  override create(@Body() dto: CreateInvoiceDto) {
    return super.create(dto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateInvoiceDto })
  override update(@Param('id') id: string, @Body() dto: UpdateInvoiceDto) {
    return super.update(id, dto);
  }
}
