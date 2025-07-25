import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { SupportType } from '../../shared/enums/support-type.enum';

export const createProductSchema = z.object({
  companyId: z.uuid(),
  warehouseId: z.uuid(),
  name: z.string().min(2).max(64),
  sku: z.string().min(2).max(100),
  prodType: z.enum(SupportType),
  price: z.number().nonnegative(),
  modifiedById: z.uuid(),
});

export class CreateProductDto extends createZodDto(createProductSchema) {}

export const updateProductSchema = createProductSchema.partial();

export class UpdateProductDto extends createZodDto(updateProductSchema) {}
