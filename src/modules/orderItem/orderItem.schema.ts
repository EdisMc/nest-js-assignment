import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createOrderItemSchema = z.object({
  productId: z.uuid(),
  orderId: z.uuid(),
  quantity: z.number().int().positive(),
  priceAtOrder: z.number().nonnegative(),
  modifiedById: z.string(),
});

export class CreateOrderItemDto extends createZodDto(createOrderItemSchema) {}

export const updateOrderItemSchema = createOrderItemSchema.partial();

export class UpdateOrderItemDto extends createZodDto(updateOrderItemSchema) {}
