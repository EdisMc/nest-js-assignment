import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createInvoiceSchema = z.object({
  orderId: z.uuid(),
  invoiceNumber: z.string().min(1).max(100),
  issueDate: z.coerce.date().optional(),
  modifiedById: z.string(),
});

export class CreateInvoiceDto extends createZodDto(createInvoiceSchema) {}

export const updateInvoiceSchema = createInvoiceSchema.partial();

export class UpdateInvoiceDto extends createZodDto(updateInvoiceSchema) {}
