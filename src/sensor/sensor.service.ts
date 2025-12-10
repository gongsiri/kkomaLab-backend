import { BadRequestException, Injectable } from '@nestjs/common';
import { SensorRepository } from './sensor.repository';
import { SensorMessageInput } from './inputs/sensor-message.input';
import { SensorEntity } from './entity/sensor.entity';
import { TemperatureEntity } from './entity/temperature.entity';
import { HumidityEntity } from './entity/humidity.entity';
import { Co2Entity } from './entity/co2.entity';
import { MotionEntity } from './entity/motion.entity';

@Injectable()
export class SensorService {
  constructor(private readonly sensorRepository: SensorRepository) {}

  public async createTemperature(
    input: SensorMessageInput,
  ): Promise<TemperatureEntity> {
    const temperature = await this.sensorRepository.insertTemperature(
      input.value,
    );
    return TemperatureEntity.fromPrisma(temperature);
  }

  public async createHumidity(
    input: SensorMessageInput,
  ): Promise<HumidityEntity> {
    const humidity = await this.sensorRepository.insertHumidity(input.value);
    return HumidityEntity.fromPrisma(humidity);
  }

  public async createCo2(input: SensorMessageInput): Promise<Co2Entity> {
    const co2 = await this.sensorRepository.insertCo2(input.value);
    return Co2Entity.fromPrisma(co2);
  }

  public async createMotion(input: SensorMessageInput): Promise<MotionEntity> {
    if (input.value !== 0 && input.value !== 1) {
      throw new BadRequestException(
        'Motion sensor value must be either 0 or 1',
      );
    }

    const motion = await this.sensorRepository.insertMotion(input.value === 1);
    return MotionEntity.fromPrisma(motion);
  }

  public async getAllSensorData(): Promise<SensorEntity> {
    const [temperatureList, humidityList, co2List, motion] = await Promise.all([
      this.sensorRepository.selectLatestTemperatureList(15),
      this.sensorRepository.selectLatestHumidityList(15),
      this.sensorRepository.selectLatestCo2List(15),
      this.sensorRepository.selectLatestMotion(),
    ]);

    return SensorEntity.fromPrisma({
      temperatureList,
      humidityList,
      co2List,
      motion,
    });
  }
}
