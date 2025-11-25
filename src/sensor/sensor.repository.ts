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

  public async insertTemperature(value: number): Promise<void> {
    await this.prisma.temperature.create({
      data: {
        degree: value,
      },
    });
  }

  public async insertHumidity(value: number): Promise<void> {
    await this.prisma.humidity.create({
      data: {
        percent: value,
      },
    });
  }

  public async insertCo2(value: number): Promise<void> {
    await this.prisma.co2.create({
      data: {
        ppm: value,
      },
    });
  }

  public async insertMotion(signal: boolean): Promise<void> {
    await this.prisma.motionDetect.create({
      data: {
        signal,
      },
    });
  }

  public async selectLatestTemperature(): Promise<SelectTemperature | null> {
    return this.prisma.temperature.findFirst({
      orderBy: { createdAt: 'desc' },
      ...SELECT_TEMPERATURE,
    });
  }

  public async selectLatestHumidity(): Promise<SelectHumidity | null> {
    return this.prisma.humidity.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      ...SELECT_HUMIDITY,
    });
  }

  public async selectLatestCo2(): Promise<SelectCo2 | null> {
    return this.prisma.co2.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      ...SELECT_CO2,
    });
  }

  public async selectLatestMotion(): Promise<SelectMotion | null> {
    return this.prisma.motionDetect.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      ...SELECT_MOTION,
    });
  }
}
