import { SelectCo2 } from '../prisma-type/select-co2';

export class Co2Entity {
  public id: string;
  public ppm: number;
  public createdAt: Date;

  constructor(data: Co2Entity) {
    Object.assign(this, data);
  }

  public static fromPrisma(data: SelectCo2): Co2Entity {
    return new Co2Entity({
      id: data.id,
      ppm: data.ppm,
      createdAt: data.createdAt,
    });
  }
}
