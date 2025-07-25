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
import { Invoice } from './invoice.entity';
import { CreateInvoiceDto, UpdateInvoiceDto } from './invoice.schema';
import { InvoiceService } from './invoice.service';

@ApiTags('Invoices')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles('OWNER', 'OPERATOR')
  @ApiBody({ type: CreateInvoiceDto })
  override create(@Body() dto: CreateInvoiceDto) {
    return super.create(dto);
  }

  @Put(':id')
  @Roles('OWNER', 'OPERATOR')
  @ApiBody({ type: UpdateInvoiceDto })
  override update(@Param('id') id: string, @Body() dto: UpdateInvoiceDto) {
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
