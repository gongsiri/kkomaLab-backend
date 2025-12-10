import { SelectMotion } from '../prisma-type/select-motion';

export class MotionEntity {
  public id: string;
  public signal: boolean;
  public createdAt: Date;

  constructor(data: MotionEntity) {
    Object.assign(this, data);
  }

  public static fromPrisma(data: SelectMotion): MotionEntity {
    return new MotionEntity({
      id: data.id,
      signal: data.signal,
      createdAt: data.createdAt,
    });
  }
}
