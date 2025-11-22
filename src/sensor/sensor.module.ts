import { Module } from '@nestjs/common';
import { SensorRepository } from './sensor.repository';
import { SensorService } from './sensor.service';

@Module({
  providers: [SensorService, SensorRepository],
  exports: [SensorService],
})
export class SensorModule {}
