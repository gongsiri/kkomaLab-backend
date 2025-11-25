import { Prisma } from '@prisma/client';

export const SELECT_CO2 = Prisma.validator<Prisma.Co2DefaultArgs>()({
  select: {
    ppm: true,
    createdAt: true,
  },
});

export type SelectCo2 = Prisma.Co2GetPayload<typeof SELECT_CO2>;
