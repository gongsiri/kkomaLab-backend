import { SelectHumidity } from '../prisma-type/select-humidity';

export class HumidityEntity {
  public id: string;
  public percent: number;
  public createdAt: Date;

  constructor(data: HumidityEntity) {
    Object.assign(this, data);
  }

  public static fromPrisma(data: SelectHumidity): HumidityEntity {
    return new HumidityEntity({
      id: data.id,
      percent: data.percent,
      createdAt: data.createdAt,
    });
  }
}
