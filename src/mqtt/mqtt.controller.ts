import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { DeviceService } from 'src/device/device.service';
import { SensorService } from 'src/sensor/sensor.service';
import { MqttType } from './constants/mqtt.type';

@Controller()
export class MqttController {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly sensorService: SensorService,
  ) {}

  @EventPattern(MqttType.TEMPERATURE)
  public async handleTemperature() {}

  @EventPattern(MqttType.HUMIDITY)
  public async handleHumidity() {}

  @EventPattern(MqttType.CO2)
  public async handleCo2() {}

  @EventPattern(MqttType.MOTION)
  public async handleMotion() {}

  @EventPattern(MqttType.FAN_STATE)
  public async handleFanState() {}

  @EventPattern(MqttType.LIGHT_STATE)
  public async handleLedState() {}
}
