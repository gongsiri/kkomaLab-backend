import { Injectable } from '@nestjs/common';
import { DeviceRepository } from './device.repository';
import { DeviceMessageInput } from './inputs/device-message.input';
import { DeviceEntity } from './entity/device.entity';
import { StateType } from './constants/state.type';

@Injectable()
export class DeviceService {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  public async createFanState(input: DeviceMessageInput): Promise<void> {
    const isOn = input.state === StateType.ON;

    await this.deviceRepository.insertFanState(input.mode, isOn);
  }

  public async createLedState(input: DeviceMessageInput): Promise<void> {
    const isOn = input.state === StateType.ON;

    await this.deviceRepository.insertLedState(input.mode, isOn);
  }

  public async getAllDeviceState(): Promise<DeviceEntity> {
    const [fanState, ledState] = await Promise.all([
      this.deviceRepository.selectLatestFanState(),
      this.deviceRepository.selectLatestLedState(),
    ]);
    return new DeviceEntity(fanState, ledState);
  }
}
