import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { OrderType } from '../../shared/enums/order-type.enum';

export const createOrderSchema = z.object({
  companyId: z.uuid(),
  warehouseId: z.uuid(),
  partnerId: z.uuid(),
  date: z.coerce.date(),
  type: z.enum(OrderType),
  modifiedById: z.uuid(),
});

export class CreateOrderDto extends createZodDto(createOrderSchema) {}

export const updateOrderSchema = createOrderSchema.partial();

export class UpdateOrderDto extends createZodDto(updateOrderSchema) {}
