import { Module } from '@nestjs/common';
import { DeviceModule } from 'src/device/device.module';
import { SensorModule } from 'src/sensor/sensor.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DashboardGateway } from './dashboard.gateway';

@Module({
  imports: [SensorModule, DeviceModule],
  providers: [DashboardService, DashboardGateway],
  controllers: [DashboardController],
  exports: [DashboardGateway],
})
export class DashboardModule {}
