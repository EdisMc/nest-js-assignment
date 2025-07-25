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
import { Company } from './company.entity';
import { CreateCompanyDto, UpdateCompanyDto } from './company.schema';
import { CompanyService } from './company.service';

@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles('OWNER', 'OPERATOR')
  @ApiBody({ type: CreateCompanyDto })
  override create(@Body() dto: CreateCompanyDto) {
    return super.create(dto);
  }

  @Put(':id')
  @Roles('OWNER', 'OPERATOR')
  @ApiBody({ type: UpdateCompanyDto })
  override update(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
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
