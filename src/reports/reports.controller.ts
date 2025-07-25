import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { ReportsService } from './reports.service';

@ApiTags('Reports')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('bestselling-products')
  @Roles('OWNER', 'OPERATOR', 'VIEWER')
  getBestsellingProducts(@Req() req) {
    return this.reportsService.getBestsellingProducts(req.user.companyId);
  }

  @Get('top-client')
  @Roles('OWNER', 'OPERATOR', 'VIEWER')
  getTopClient(@Req() req) {
    return this.reportsService.getTopClient(req.user.companyId);
  }

  @Get('highest-stock')
  @Roles('OWNER', 'OPERATOR', 'VIEWER')
  async getHighestStockProductPerWarehouse(@Req() req) {
    return this.reportsService.getHighestStockProductPerWarehouse(req.user.companyId);
  }
}