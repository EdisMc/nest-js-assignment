import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '../../shared/entity/base.entity';
import { PartnerType } from '../../shared/enums/partner-type.enum';
import { Company } from '../company/company.entity';
import { Order } from '../order/order.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'partner' })
export class Partner extends BaseEntity {
  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'enum', enum: PartnerType })
  type: PartnerType;

  @ManyToOne(() => Company, (company) => company.partners)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => Order, (order) => order.partner)
  orders: Order[];

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'modified_by' })
  modifiedBy?: User;
}
