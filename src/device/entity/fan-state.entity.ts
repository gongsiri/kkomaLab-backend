import { SelectFanState } from '../prisma-type/select-fan-state';

export class FanStateEntity {
  public id: string;
  public mode: string;
  public isOn: boolean;
  public createdAt: Date;

  constructor(data: FanStateEntity) {
    Object.assign(this, data);
  }

  public static fromPrisma(data: SelectFanState): FanStateEntity {
    return new FanStateEntity({
      id: data.id,
      mode: data.mode,
      isOn: data.isOn,
      createdAt: data.createdAt,
    });
  }
}
