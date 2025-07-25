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
import { Partner } from './partner.entity';
import { CreatePartnerDto, UpdatePartnerDto } from './partner.schema';
import { PartnerService } from './partner.service';

@ApiTags('Partners')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles('OWNER', 'OPERATOR')
  @ApiBody({ type: CreatePartnerDto })
  override create(@Body() dto: CreatePartnerDto) {
    return super.create(dto);
  }

  @Put(':id')
  @Roles('OWNER', 'OPERATOR')
  @ApiBody({ type: UpdatePartnerDto })
  override update(@Param('id') id: string, @Body() dto: UpdatePartnerDto) {
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
