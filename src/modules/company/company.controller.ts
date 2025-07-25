import { BaseController } from 'src/shared/controller/base.controller';

import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { Company } from './company.entity';
import { CreateCompanyDto, UpdateCompanyDto } from './company.schema';
import { CompanyService } from './company.service';

@ApiTags('Companies')
@ApiBearerAuth('Authorization')
@Controller('companies')
export class CompanyController extends BaseController<
  Company,
  CreateCompanyDto,
  UpdateCompanyDto
> {
  constructor(protected readonly companyService: CompanyService) {
    super(companyService);
  }

  @Post()
  @ApiBody({ type: CreateCompanyDto })
  override create(@Body() dto: CreateCompanyDto) {
    return super.create(dto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateCompanyDto })
  override update(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
    return super.update(id, dto);
  }
}
