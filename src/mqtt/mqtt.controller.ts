import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { DeviceService } from 'src/device/device.service';
import { SensorService } from 'src/sensor/sensor.service';
import { MqttType } from './constants/mqtt.type';
import { SensorMessageDto } from './dto/request/sensor-message.dto';
import { DeviceMessageDto } from './dto/request/device-message.dto';
import { DashboardGateway } from 'src/dashboard/dashboard.gateway';

@Controller()
export class MqttController {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly sensorService: SensorService,
    private readonly dashboardGateway: DashboardGateway,
  ) {}

  @EventPattern(MqttType.TEMPERATURE)
  public async handleTemperature(
    @Payload() dto: SensorMessageDto,
  ): Promise<void> {
    const temperature = await this.sensorService.createTemperature(dto);
    this.dashboardGateway.emitTemperatureUpdate(temperature);
  }

  @EventPattern(MqttType.HUMIDITY)
  public async handleHumidity(@Payload() dto: SensorMessageDto): Promise<void> {
    const humidity = await this.sensorService.createHumidity(dto);
    this.dashboardGateway.emitHumidityUpdate(humidity);
  }

  @EventPattern(MqttType.CO2)
  public async handleCo2(@Payload() dto: SensorMessageDto): Promise<void> {
    const co2 = await this.sensorService.createCo2(dto);
    this.dashboardGateway.emitCo2Update(co2);
  }

  @EventPattern(MqttType.MOTION_DETECT)
  public async handleMotion(@Payload() dto: SensorMessageDto): Promise<void> {
    const motion = await this.sensorService.createMotion(dto);

    if (!motion) {
      console.log('[DB SKIP] same motion state');
      return;
    }

    this.dashboardGateway.emitMotionUpdate(motion);
  }

  @EventPattern(MqttType.FAN_STATE)
  public async handleFanState(@Payload() dto: DeviceMessageDto): Promise<void> {
    const fanState = await this.deviceService.createFanState(dto);

    if (!fanState) {
      console.log('[DB SKIP] same fan state');
      return;
    }

    this.dashboardGateway.emitFanUpdate(fanState);
  }

  @EventPattern(MqttType.LIGHT_STATE)
  public async handleLedState(@Payload() dto: DeviceMessageDto): Promise<void> {
    const ledState = await this.deviceService.createLedState(dto);

    if (!ledState) {
      console.log('[DB SKIP] same led state');
      return;
    }

    this.dashboardGateway.emitLedUpdate(ledState);
  }
}
