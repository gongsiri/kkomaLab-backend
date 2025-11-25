import { Module } from '@nestjs/common';
import { DeviceModule } from 'src/device/device.module';
import { SensorModule } from 'src/sensor/sensor.module';
import { MqttController } from './mqtt.controller';

@Module({
  imports: [SensorModule, DeviceModule],
  controllers: [MqttController],
})
export class MqttModule {}
