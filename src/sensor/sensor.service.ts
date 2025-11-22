import { BadRequestException, Injectable } from '@nestjs/common';
import { SensorRepository } from './sensor.repository';
import { SensorMessageInput } from './inputs/sensor-message.input';
import { SensorEntity } from './entity/sensor.entity';

@Injectable()
export class SensorService {
  constructor(private readonly sensorRepository: SensorRepository) {}

  public async createTemperature(input: SensorMessageInput): Promise<void> {
    await this.sensorRepository.insertTemperature(input.deviceId, input.value);
  }

  public async createHumidity(input: SensorMessageInput): Promise<void> {
    await this.sensorRepository.insertHumidity(input.deviceId, input.value);
  }

  public async createCo2(input: SensorMessageInput): Promise<void> {
    await this.sensorRepository.insertCo2(input.deviceId, input.value);
  }

  public async createMotion(input: SensorMessageInput): Promise<void> {
    if (input.value !== 0 && input.value !== 1) {
      throw new BadRequestException(
        'Motion sensor value must be either 0 or 1',
      );
    }

    await this.sensorRepository.insertMotion(input.deviceId, input.value === 1);
  }

  public async getAllSensorData(deviceId: string): Promise<SensorEntity> {
    const [temperature, humidity, co2, motion] = await Promise.all([
      this.sensorRepository.selectLatestTemperature(deviceId),
      this.sensorRepository.selectLatestHumidity(deviceId),
      this.sensorRepository.selectLatestCo2(deviceId),
      this.sensorRepository.selectLatestMotion(deviceId),
    ]);

    return new SensorEntity(temperature, humidity, co2, motion);
  }
}
