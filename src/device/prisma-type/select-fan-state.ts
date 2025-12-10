import { Prisma } from '@prisma/client';

export const SELECT_FAN_STATE = Prisma.validator<Prisma.FanStateDefaultArgs>()({
  select: {
    id: true,
    mode: true,
    isOn: true,
    createdAt: true,
  },
});

export type SelectFanState = Prisma.FanStateGetPayload<typeof SELECT_FAN_STATE>;
