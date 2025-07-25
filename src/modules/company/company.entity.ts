import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '../../shared/entity/base.entity';
import { Order } from '../order/order.entity';
import { Partner } from '../partner/partner.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { Warehouse } from '../warehouse/warehouse.entity';

@Entity({ name: 'company' })
export class Company extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Warehouse, (warehouse) => warehouse.company)
  warehouses: Warehouse[];

  @OneToMany(() => Product, (product) => product.company)
  products: Product[];

  @OneToMany(() => Partner, (partner) => partner.company)
  partners: Partner[];

  @OneToMany(() => Order, (order) => order.company)
  orders: Order[];

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'modified_by' })
  modifiedBy?: User;
}
