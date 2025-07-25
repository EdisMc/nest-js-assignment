import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '../modules/order/order.entity';
import { OrderItem } from '../modules/orderItem/orderItem.entity';
import { Partner } from '../modules/partner/partner.entity';
import { Product } from '../modules/product/product.entity';
import { Warehouse } from '../modules/warehouse/warehouse.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem, Order, Partner, Product, Warehouse]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
