import { Prisma } from '@prisma/client';

export const SELECT_MOTION = Prisma.validator<Prisma.MotionDetectDefaultArgs>()(
  {
    select: {
      id: true,
      signal: true,
      createdAt: true,
    },
  },
);

export type SelectMotion = Prisma.MotionDetectGetPayload<typeof SELECT_MOTION>;
