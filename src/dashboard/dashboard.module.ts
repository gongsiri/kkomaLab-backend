import { Module } from '@nestjs/common';
import { DeviceModule } from 'src/device/device.module';
import { SensorModule } from 'src/sensor/sensor.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [SensorModule, DeviceModule],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
