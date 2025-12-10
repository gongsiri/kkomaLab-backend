import { SelectTemperature } from '../prisma-type/select-temperature';

export class TemperatureEntity {
  public id: string;
  public degree: number;
  public createdAt: Date;

  constructor(data: TemperatureEntity) {
    Object.assign(this, data);
  }

  public static fromPrisma(data: SelectTemperature): TemperatureEntity {
    return new TemperatureEntity({
      id: data.id,
      degree: data.degree,
      createdAt: data.createdAt,
    });
  }
}
