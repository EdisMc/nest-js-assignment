import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { SupportType } from '../../shared/enums/support-type.enum';

export const createWarehouseSchema = z.object({
  companyId: z.uuid(),
  name: z.string().min(2).max(64),
  location: z.string().min(2).max(128),
  supportType: z.enum(SupportType),
  modifiedById: z.uuid(),
});

export class CreateWarehouseDto extends createZodDto(createWarehouseSchema) {}

export const updateWarehouseSchema = createWarehouseSchema.partial();

export class UpdateWarehouseDto extends createZodDto(updateWarehouseSchema) {}
