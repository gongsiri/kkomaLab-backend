import { Injectable } from '@nestjs/common';
import { DeviceService } from 'src/device/device.service';
import { SensorService } from 'src/sensor/sensor.service';
import { DashboardEntity } from './entity/dashboard.entity';

@Injectable()
export class DashboardService {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly sensorService: SensorService,
  ) {}

  public async getDashboard(): Promise<DashboardEntity> {
    const [sensor, device] = await Promise.all([
      this.sensorService.getAllSensorData(),
      this.deviceService.getAllDeviceState(),
    ]);

    return new DashboardEntity(sensor, device);
  }
}
