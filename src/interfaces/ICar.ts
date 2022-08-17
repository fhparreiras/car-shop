import { z } from 'zod';
import { vehiclesZodSchema } from './IVehicle';

const carsZodSchema = z.object({
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

type ICar = z.infer<typeof carsZodSchema & typeof vehiclesZodSchema>;

export { ICar, carsZodSchema };
