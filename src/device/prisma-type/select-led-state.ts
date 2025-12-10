import { Prisma } from '@prisma/client';

export const SELECT_LED_STATE = Prisma.validator<Prisma.LedStateDefaultArgs>()({
  select: {
    id: true,
    mode: true,
    isOn: true,
    createdAt: true,
  },
});

export type SelectLedState = Prisma.LedStateGetPayload<typeof SELECT_LED_STATE>;
