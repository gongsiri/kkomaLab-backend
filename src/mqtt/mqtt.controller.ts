import { Controller } from '@nestjs/common';
import { DeviceService } from 'src/device/device.service';
import { SensorService } from 'src/sensor/sensor.service';

@Controller()
export class MqttController {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly sensorService: SensorService,
  ) {}
}
