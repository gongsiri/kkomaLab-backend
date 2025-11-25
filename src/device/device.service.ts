import { Injectable } from '@nestjs/common';
import { DeviceRepository } from './device.repository';
import { DeviceMessageInput } from './inputs/device-message.input';
import { DeviceEntity } from './entity/device.entity';

@Injectable()
export class DeviceService {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  public async createFanState(input: DeviceMessageInput): Promise<void> {
    await this.deviceRepository.insertFanState(input.mode, input.isOn);
  }

  public async createLedState(input: DeviceMessageInput): Promise<void> {
    await this.deviceRepository.insertLedState(input.mode, input.isOn);
  }

  public async getAllDeviceState(): Promise<DeviceEntity> {
    const [fanState, ledState] = await Promise.all([
      this.deviceRepository.selectLatestFanState(),
      this.deviceRepository.selectLatestLedState(),
    ]);
    return new DeviceEntity(fanState, ledState);
  }
}
