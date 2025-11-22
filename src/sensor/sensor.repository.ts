import { Injectable } from '@nestjs/common';
import {
  SELECT_TEMPERATURE,
  SelectTemperature,
} from './prisma-type/select-temperature';
import { PrismaService } from 'src/prisma/prisma.service';
import { SELECT_HUMIDITY, SelectHumidity } from './prisma-type/select-humidity';
import { SELECT_CO2, SelectCo2 } from './prisma-type/select-co2';
import { SELECT_MOTION, SelectMotion } from './prisma-type/select-motion';

@Injectable()
export class SensorRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async insertTemperature(
    deviceId: string,
    value: number,
  ): Promise<void> {
    await this.prisma.temperature.create({
      data: {
        deviceId,
        degree: value,
      },
    });
  }

  public async insertHumidity(deviceId: string, value: number): Promise<void> {
    await this.prisma.humidity.create({
      data: {
        deviceId,
        percent: value,
      },
    });
  }

  public async insertCo2(deviceId: string, value: number): Promise<void> {
    await this.prisma.co2.create({
      data: {
        deviceId,
        ppm: value,
      },
    });
  }

  public async insertMotion(deviceId: string, signal: boolean): Promise<void> {
    await this.prisma.motionDetect.create({
      data: {
        deviceId,
        signal,
      },
    });
  }

  public async selectLatestTemperature(
    deviceId: string,
  ): Promise<SelectTemperature | null> {
    return this.prisma.temperature.findFirst({
      where: { deviceId },
      orderBy: { createdAt: 'desc' },
      ...SELECT_TEMPERATURE,
    });
  }

  public async selectLatestHumidity(
    deviceId: string,
  ): Promise<SelectHumidity | null> {
    return this.prisma.humidity.findFirst({
      where: {
        deviceId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...SELECT_HUMIDITY,
    });
  }

  public async selectLatestCo2(deviceId: string): Promise<SelectCo2 | null> {
    return this.prisma.co2.findFirst({
      where: {
        deviceId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...SELECT_CO2,
    });
  }

  public async selectLatestMotion(
    deviceId: string,
  ): Promise<SelectMotion | null> {
    return this.prisma.motionDetect.findFirst({
      where: {
        deviceId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...SELECT_MOTION,
    });
  }
}
