import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '../../shared/entity/base.entity';
import { SupportType } from '../../shared/enums/support-type.enum';
import { Company } from '../company/company.entity';
import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'warehouse' })
export class Warehouse extends BaseEntity {
  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({ name: 'support_type', type: 'enum', enum: SupportType })
  supportType: SupportType;

  @ManyToOne(() => Company, (company) => company.warehouses)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => Order, (order) => order.warehouse)
  orders: Order[];

  @OneToMany(() => Product, (product) => product.warehouse)
  products: Product[];

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'modified_by' })
  modifiedBy?: User;
}
