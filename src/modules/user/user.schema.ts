import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { UserRole } from '../../shared/enums/user-role.enum';

export const createUserSchema = z.object({
  companyId: z.uuid(),
  name: z.string().min(2).max(64),
  email: z.email(),
  password: z.string().min(6).max(255),
  role: z.enum(UserRole),
});

export class CreateUserDto extends createZodDto(createUserSchema) {}

export const updateUserSchema = createUserSchema.partial();

export class UpdateUserDto extends createZodDto(updateUserSchema) {}
