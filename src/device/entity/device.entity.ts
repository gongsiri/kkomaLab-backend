import { SelectFanState } from '../prisma-type/select-fan-state';
import { SelectLedState } from '../prisma-type/select-led-state';
import { FanStateEntity } from './fan-state.entity';
import { LedStateEntity } from './led-state.entity';

export class DeviceEntity {
  fan: FanStateEntity | null;
  led: LedStateEntity | null;

  constructor(data: DeviceEntity) {
    Object.assign(this, data);
  }

  public static fromPrisma(data: {
    fan: SelectFanState | null;
    led: SelectLedState | null;
  }): DeviceEntity {
    return new DeviceEntity({
      fan: data.fan ? FanStateEntity.fromPrisma(data.fan) : null,
      led: data.led ? LedStateEntity.fromPrisma(data.led) : null,
    });
  }
}
