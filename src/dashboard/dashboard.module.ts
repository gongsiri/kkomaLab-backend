import { Module } from '@nestjs/common';
import { DeviceModule } from 'src/device/device.module';
import { SensorModule } from 'src/sensor/sensor.module';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [SensorModule, DeviceModule],
  controllers: [DashboardController],
})
export class DashboardModule {}
