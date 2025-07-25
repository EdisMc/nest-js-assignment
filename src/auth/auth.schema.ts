import { createZodDto } from 'nestjs-zod';
import { UserRole } from 'src/shared/enums/user-role.enum';
import { z } from 'zod';

export const registerSchema = z.object({
  companyId: z.uuid(),
  name: z.string().min(2).max(64),
  email: z.email(),
  password: z.string().min(6).max(255),
  role: z.enum(UserRole).optional(),
});

export class RegisterDto extends createZodDto(registerSchema) {}

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(255),
});

export class LoginDto extends createZodDto(loginSchema) {}
