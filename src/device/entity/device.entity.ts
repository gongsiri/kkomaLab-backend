import { SelectFanState } from '../prisma-type/select-fan-state';
import { SelectLedState } from '../prisma-type/select-led-state';

export class DeviceEntity {
  fan: SelectFanState | null;
  led: SelectLedState | null;

  constructor(fan: SelectFanState | null, led: SelectLedState | null) {
    this.fan = fan;
    this.led = led;
  }
}
