import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
} from 'typeorm';

import { BaseEntity } from '../../shared/entity/base.entity';
import { OrderType } from '../../shared/enums/order-type.enum';
import { Company } from '../company/company.entity';
import { Invoice } from '../invoice/invoice.entity';
import { OrderItem } from '../orderItem/orderItem.entity';
import { Partner } from '../partner/partner.entity';
import { User } from '../user/user.entity';
import { Warehouse } from '../warehouse/warehouse.entity';

@Entity({ name: 'order' })
export class Order extends BaseEntity {
  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @Column({ name: 'warehouse_id', type: 'uuid' })
  warehouseId: string;

  @Column({ name: 'partner_id', type: 'uuid' })
  partnerId: string;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  date: Date;

  @Column({ name: 'type', type: 'enum', enum: OrderType })
  type: OrderType;

  @ManyToOne(() => Company, (company) => company.orders)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Partner, (partner) => partner.orders)
  @JoinColumn({ name: 'partner_id' })
  partner: Partner;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.orders)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @OneToOne(() => Invoice, (invoice) => invoice.order)
  invoice: Invoice;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'modified_by' })
  modifiedBy?: User;
}
