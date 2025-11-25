import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DeviceRepository } from './device.repository';
import { DeviceMessageInput } from './inputs/device-message.input';
import { DeviceEntity } from './entity/device.entity';
import { StateType } from './constants/state.type';
import { MqttClient } from 'mqtt';
import { MqttType } from 'src/mqtt/constants/mqtt.type';
import { CommandInput } from './inputs/fan-command.input';

@Injectable()
export class DeviceService implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  private mqttRawClient: MqttClient;

  public async onModuleInit(): Promise<void> {}

  public async onModuleDestroy(): Promise<void> {}

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

  public publishFanCommand(input: CommandInput): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.mqttRawClient.publish(
        MqttType.FAN_COMMAND,
        input.command,
        {
          qos: 0,
          retain: false,
        },
        (error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        },
      );
    });
  }

  public publishLedCommand(input: CommandInput): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.mqttRawClient.publish(
        MqttType.LIGHT_COMMAND,
        input.command,
        {
          qos: 0,
          retain: false,
        },
        (error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        },
      );
    });
  }
}
