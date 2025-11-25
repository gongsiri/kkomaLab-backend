import { Prisma } from '@prisma/client';

export const SELECT_TEMPERATURE = Prisma.validator()({
  select: {
    degree: true,
    createdAt: true,
  },
});

export type SelectTemperature = Prisma.TemperatureGetPayload<
  typeof SELECT_TEMPERATURE
>;
