import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DeviceRepository } from './device.repository';
import { DeviceMessageInput } from './inputs/device-message.input';
import { DeviceEntity } from './entity/device.entity';
import { StateType } from './constants/state.type';
import { connect, MqttClient } from 'mqtt';
import { MqttType } from 'src/mqtt/constants/mqtt.type';
import { CommandInput } from './inputs/fan-command.input';
import { ConfigService } from '@nestjs/config';
import { FanStateEntity } from './entity/fan-state.entity';
import { LedStateEntity } from './entity/led-state.entity';

@Injectable()
export class DeviceService implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly configService: ConfigService,
  ) {}

  private mqttRawClient: MqttClient;

  public onModuleInit(): void {
    const mqttUrl = this.configService.getOrThrow<string>('MQTT_URL');

    this.mqttRawClient = connect(mqttUrl);

    this.mqttRawClient.on('connect', () => {
      console.log('[MQTT RAW] Connected');
    });

    this.mqttRawClient.on('error', (error) => {
      console.error('[MQTT RAW] Error:', error);
    });
  }

  public onModuleDestroy(): void {
    this.mqttRawClient?.end();
  }

  public async createFanState(
    input: DeviceMessageInput,
  ): Promise<FanStateEntity | null> {
    const isOn = input.state === StateType.ON;

    const latestFan = await this.deviceRepository.selectLatestFanState();

    if (latestFan && latestFan.mode === input.mode && latestFan.isOn === isOn)
      return null;

    const fan = await this.deviceRepository.insertFanState(input.mode, isOn);
    return FanStateEntity.fromPrisma(fan);
  }

  public async createLedState(
    input: DeviceMessageInput,
  ): Promise<LedStateEntity | null> {
    const isOn = input.state === StateType.ON;

    const latestLed = await this.deviceRepository.selectLatestLedState();

    if (latestLed && latestLed.mode === input.mode && latestLed.isOn === isOn)
      return null;

    const led = await this.deviceRepository.insertLedState(input.mode, isOn);
    return LedStateEntity.fromPrisma(led);
  }

  public async getAllDeviceState(): Promise<DeviceEntity> {
    const [fan, led] = await Promise.all([
      this.deviceRepository.selectLatestFanState(),
      this.deviceRepository.selectLatestLedState(),
    ]);
    return DeviceEntity.fromPrisma({ fan, led });
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

          console.log(
            '[MQTT COMMAND SEND]',
            MqttType.LIGHT_COMMAND,
            input.command,
          );

          resolve();
        },
      );
    });
  }
}
