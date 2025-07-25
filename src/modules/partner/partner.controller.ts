import { BaseController } from 'src/shared/controller/base.controller';

import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { Partner } from './partner.entity';
import { CreatePartnerDto, UpdatePartnerDto } from './partner.schema';
import { PartnerService } from './partner.service';

@ApiTags('Partners')
@ApiBearerAuth('Authorization')
@Controller('partners')
export class PartnerController extends BaseController<
  Partner,
  CreatePartnerDto,
  UpdatePartnerDto
> {
  constructor(protected readonly partnerService: PartnerService) {
    super(partnerService);
  }

  @Post()
  @ApiBody({ type: CreatePartnerDto })
  override create(@Body() dto: CreatePartnerDto) {
    return super.create(dto);
  }

  @Put(':id')
  @ApiBody({ type: UpdatePartnerDto })
  override update(@Param('id') id: string, @Body() dto: UpdatePartnerDto) {
    return super.update(id, dto);
  }
}
