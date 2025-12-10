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

  public async insertTemperature(value: number): Promise<SelectTemperature> {
    return this.prisma.temperature.create({
      data: {
        degree: value,
      },
      ...SELECT_TEMPERATURE,
    });
  }

  public async insertHumidity(value: number): Promise<SelectHumidity> {
    return this.prisma.humidity.create({
      data: {
        percent: value,
      },
      ...SELECT_HUMIDITY,
    });
  }

  public async insertCo2(value: number): Promise<SelectCo2> {
    return this.prisma.co2.create({
      data: {
        ppm: value,
      },
      ...SELECT_CO2,
    });
  }

  public async insertMotion(signal: boolean): Promise<SelectMotion> {
    return this.prisma.motionDetect.create({
      data: {
        signal,
      },
      ...SELECT_MOTION,
    });
  }

  public async selectLatestTemperatureList(
    limit: number,
  ): Promise<SelectTemperature[]> {
    return this.prisma.temperature.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      ...SELECT_TEMPERATURE,
    });
  }

  public async selectLatestHumidityList(
    limit: number,
  ): Promise<SelectHumidity[]> {
    return this.prisma.humidity.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      ...SELECT_HUMIDITY,
    });
  }

  public async selectLatestCo2List(limit: number): Promise<SelectCo2[]> {
    return this.prisma.co2.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
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
