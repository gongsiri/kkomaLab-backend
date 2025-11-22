import { Prisma } from "@prisma/client";

export const SELECT_HUMIDITY = Prisma.validator<Prisma.HumidityDefaultArgs>()({
  select: {
    deviceId: true,
    percent: true,
    createdAt: true,
  },
});

export type SelectHumidity = Prisma.HumidityGetPayload<typeof SELECT_HUMIDITY>;
