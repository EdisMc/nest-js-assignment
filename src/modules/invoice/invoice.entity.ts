import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { BaseEntity } from '../../shared/entities/base.entity';
import { Order } from '../order/order.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'invoice' })
export class Invoice extends BaseEntity {
  @Column({ name: 'order_id', type: 'uuid' })
  orderId: string;

  @Column({
    name: 'invoice_number',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  invoiceNumber: string;

  @Column({ name: 'issue_date', type: 'timestamptz', default: () => 'now()' })
  issueDate: Date;

  @OneToOne(() => Order, (order) => order.invoice)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'modified_by' })
  modifiedBy?: User;
}
