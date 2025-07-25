import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { PartnerType } from '../../shared/enums/partner-type.enum';

export const createPartnerSchema = z.object({
  companyId: z.uuid(),
  name: z.string().min(2).max(64),
  type: z.enum(PartnerType),
  modifiedById: z.string(),
});

export class CreatePartnerDto extends createZodDto(createPartnerSchema) {}

export const updatePartnerSchema = createPartnerSchema.partial();

export class UpdatePartnerDto extends createZodDto(updatePartnerSchema) {}
