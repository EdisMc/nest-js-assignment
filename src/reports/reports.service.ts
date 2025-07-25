import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Order } from '../modules/order/order.entity';
import { OrderItem } from '../modules/orderItem/orderItem.entity';
import { Partner } from '../modules/partner/partner.entity';
import { Product } from '../modules/product/product.entity';
import { Warehouse } from '../modules/warehouse/warehouse.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Partner) private partnerRepo: Repository<Partner>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Warehouse) private warehouseRepo: Repository<Warehouse>,
  ) {}

  async getBestsellingProducts(companyId: string) {
    const raw = await this.orderItemRepo.query(
      `
    SELECT
      p.id AS "productId",
      p.name AS "productName",
      SUM(oi.quantity) AS "totalSold"
    FROM order_item oi
    INNER JOIN product p ON p.id = oi.product_id
    INNER JOIN "order" o ON o.id = oi.order_id
    WHERE p.company_id = $1
    GROUP BY p.id, p.name
    ORDER BY SUM(oi.quantity) DESC
    LIMIT 3
    `,
      [companyId],
    );
    return raw;
  }

  async getTopClient(companyId: string) {
    const raw = await this.orderRepo.query(
      `
    SELECT
      partner.id AS "partnerId",
      partner.name AS "partnerName",
      COUNT(o.id) AS "ordersCount"
    FROM "order" o
    INNER JOIN partner ON partner.id = o.partner_id
    WHERE o.company_id = $1
      AND o.type = 'delivery'
    GROUP BY partner.id, partner.name
    ORDER BY COUNT(o.id) DESC
    LIMIT 1
    `,
      [companyId],
    );
    return raw[0] || null;
  }
  async getHighestStockProductPerWarehouse(companyId: string) {
    const raw = await this.orderItemRepo.query(
      `
    SELECT "warehouseId", "warehouseName", "productId", "productName", "totalQuantity"
    FROM (
      SELECT
        w.id AS "warehouseId",
        w.name AS "warehouseName",
        p.id AS "productId",
        p.name AS "productName",
        SUM(oi.quantity) AS "totalQuantity",
        ROW_NUMBER() OVER (PARTITION BY w.id ORDER BY SUM(oi.quantity) DESC) AS rn
      FROM order_item oi
      INNER JOIN product p ON p.id = oi.product_id
      INNER JOIN "order" o ON o.id = oi.order_id
      INNER JOIN warehouse w ON w.id = o.warehouse_id
      WHERE o.company_id = $1
      GROUP BY w.id, w.name, p.id, p.name
    ) ranked
    WHERE rn = 1
    ORDER BY "warehouseName"
    `,
      [companyId],
    );
    return raw;
  }
}
