import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../shared/entities/base.entity';

@Entity({ name: 'company' })
export class CompanyEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;
}
