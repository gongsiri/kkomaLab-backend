import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensorModule } from './sensor/sensor.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SensorModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
