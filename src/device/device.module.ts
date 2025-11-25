import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceRepository } from './device.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { DeviceController } from './device.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MQTT_CLIENT',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.MQTT,
          options: {
            url: configService.getOrThrow<string>('MQTT_URL'),
          },
        }),
      },
    ]),
  ],
  providers: [DeviceService, DeviceRepository],
  exports: [DeviceService],
  controllers: [DeviceController],
})
export class DeviceModule {}
