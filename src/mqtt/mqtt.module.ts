import { Module } from '@nestjs/common';
import { DeviceModule } from 'src/device/device.module';
import { SensorModule } from 'src/sensor/sensor.module';
import { MqttController } from './mqtt.controller';
import { DashboardModule } from 'src/dashboard/dashboard.module';

@Module({
  imports: [SensorModule, DeviceModule, DashboardModule],
  controllers: [MqttController],
})
export class MqttModule {}
