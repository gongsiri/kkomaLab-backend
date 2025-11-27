import { DeviceEntity } from 'src/device/entity/device.entity';
import { SensorEntity } from 'src/sensor/entity/sensor.entity';

export class DashboardEntity {
  public readonly sensor: SensorEntity;
  public readonly device: DeviceEntity;

  constructor(sensor: SensorEntity, device: DeviceEntity) {
    this.sensor = sensor;
    this.device = device;
  }
}
