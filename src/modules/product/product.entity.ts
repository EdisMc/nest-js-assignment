import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '../../shared/entities/base.entity';
import { SupportType } from '../../shared/enums/support-type.enum';
import { Company } from '../company/company.entity';
import { OrderItem } from '../orderItem/orderItem.entity';
import { User } from '../user/user.entity';
import { Warehouse } from '../warehouse/warehouse.entity';

@Entity({ name: 'product' })
export class Product extends BaseEntity {
  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @Column({ name: 'warehouse_id', type: 'uuid' })
  warehouseId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  sku: string;

  @Column({ name: 'prod_type', type: 'enum', enum: SupportType })
  prodType: SupportType;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price: number;

  @ManyToOne(() => Company, (company) => company.products)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.products)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'modified_by' })
  modifiedBy?: User;
}
