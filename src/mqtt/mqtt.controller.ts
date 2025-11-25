import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { DeviceService } from 'src/device/device.service';
import { SensorService } from 'src/sensor/sensor.service';
import { MqttType } from './constants/mqtt.type';
import { SensorMessageDto } from './dto/request/sensor-message.dto';
import { DeviceMessageDto } from './dto/request/device-message.dto';

@Controller()
export class MqttController {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly sensorService: SensorService,
  ) {}

  @EventPattern(MqttType.TEMPERATURE)
  public async handleTemperature(
    @Payload() dto: SensorMessageDto,
  ): Promise<void> {
    await this.sensorService.createTemperature(dto);
  }

  @EventPattern(MqttType.HUMIDITY)
  public async handleHumidity(@Payload() dto: SensorMessageDto): Promise<void> {
    await this.sensorService.createHumidity(dto);
  }

  @EventPattern(MqttType.CO2)
  public async handleCo2(@Payload() dto: SensorMessageDto): Promise<void> {
    await this.sensorService.createCo2(dto);
  }

  @EventPattern(MqttType.MOTION_DETECT)
  public async handleMotion(@Payload() dto: SensorMessageDto): Promise<void> {
    await this.sensorService.createMotion(dto);
  }

  @EventPattern(MqttType.FAN_STATE)
  public async handleFanState(@Payload() dto: DeviceMessageDto): Promise<void> {
    await this.deviceService.createFanState(dto);
  }

  @EventPattern(MqttType.LIGHT_STATE)
  public async handleLedState(@Payload() dto: DeviceMessageDto): Promise<void> {
    await this.deviceService.createLedState(dto);
  }
}
