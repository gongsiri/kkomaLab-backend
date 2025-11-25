import { BadRequestException, Injectable } from '@nestjs/common';
import { SensorRepository } from './sensor.repository';
import { SensorMessageInput } from './inputs/sensor-message.input';
import { SensorEntity } from './entity/sensor.entity';

@Injectable()
export class SensorService {
  constructor(private readonly sensorRepository: SensorRepository) {}

  public async createTemperature(input: SensorMessageInput): Promise<void> {
    await this.sensorRepository.insertTemperature(input.value);
  }

  public async createHumidity(input: SensorMessageInput): Promise<void> {
    await this.sensorRepository.insertHumidity(input.value);
  }

  public async createCo2(input: SensorMessageInput): Promise<void> {
    await this.sensorRepository.insertCo2(input.value);
  }

  public async createMotion(input: SensorMessageInput): Promise<void> {
    if (input.value !== 0 && input.value !== 1) {
      throw new BadRequestException(
        'Motion sensor value must be either 0 or 1',
      );
    }

    await this.sensorRepository.insertMotion(input.value === 1);
  }

  public async getAllSensorData(deviceId: string): Promise<SensorEntity> {
    const [temperature, humidity, co2, motion] = await Promise.all([
      this.sensorRepository.selectLatestTemperature(),
      this.sensorRepository.selectLatestHumidity(),
      this.sensorRepository.selectLatestCo2(),
      this.sensorRepository.selectLatestMotion(),
    ]);

    return new SensorEntity(temperature, humidity, co2, motion);
  }
}
