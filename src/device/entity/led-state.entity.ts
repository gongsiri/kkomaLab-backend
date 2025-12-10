import { SelectLedState } from '../prisma-type/select-led-state';

export class LedStateEntity {
  public id: string;
  public mode: string;
  public isOn: boolean;
  public createdAt: Date;

  constructor(data: LedStateEntity) {
    Object.assign(this, data);
  }

  public static fromPrisma(data: SelectLedState): LedStateEntity {
    return new LedStateEntity({
      id: data.id,
      mode: data.mode,
      isOn: data.isOn,
      createdAt: data.createdAt,
    });
  }
}
