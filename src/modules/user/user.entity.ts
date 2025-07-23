import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../shared/entities/base.entity';
import { UserRole } from '../../shared/enums/user-role.enum';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.VIEWER })
  role: UserRole;
}
