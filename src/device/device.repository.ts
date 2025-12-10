import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  SELECT_FAN_STATE,
  SelectFanState,
} from './prisma-type/select-fan-state';
import {
  SELECT_LED_STATE,
  SelectLedState,
} from './prisma-type/select-led-state';

@Injectable()
export class DeviceRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async insertFanState(
    mode: string,
    isOn: boolean,
  ): Promise<SelectFanState> {
    return await this.prisma.fanState.create({
      data: {
        mode,
        isOn,
      },
      ...SELECT_FAN_STATE,
    });
  }

  public async insertLedState(
    mode: string,
    isOn: boolean,
  ): Promise<SelectLedState> {
    return await this.prisma.ledState.create({
      data: {
        mode,
        isOn,
      },
      ...SELECT_LED_STATE,
    });
  }

  public async selectLatestFanState(): Promise<SelectFanState | null> {
    return this.prisma.fanState.findFirst({
      orderBy: { createdAt: 'desc' },
      ...SELECT_FAN_STATE,
    });
  }

  public async selectLatestLedState(): Promise<SelectLedState | null> {
    return this.prisma.ledState.findFirst({
      orderBy: { createdAt: 'desc' },
      ...SELECT_LED_STATE,
    });
  }
}
