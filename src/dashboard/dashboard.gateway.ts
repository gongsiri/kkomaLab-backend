import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DashboardEventType } from './constants/dashboard-evnent.type';
import { TemperatureEntity } from 'src/sensor/entity/temperature.entity';
import { HumidityEntity } from 'src/sensor/entity/humidity.entity';
import { Co2Entity } from 'src/sensor/entity/co2.entity';
import { MotionEntity } from 'src/sensor/entity/motion.entity';
import { FanStateEntity } from 'src/device/entity/fan-state.entity';
import { LedStateEntity } from 'src/device/entity/led-state.entity';

@WebSocketGateway({
  cors: { origin: process.env.CORS_ORIGINS?.split(','), credentials: true },
})
export class DashboardGateway {
  @WebSocketServer()
  server: Server;

  public emitTemperatureUpdate(payload: TemperatureEntity): void {
    this.server.emit(DashboardEventType.TEMPERATURE_UPDATE, payload);
  }

  public emitHumidityUpdate(payload: HumidityEntity): void {
    this.server.emit(DashboardEventType.HUMIDITY_UPDATE, payload);
  }

  public emitCo2Update(payload: Co2Entity): void {
    this.server.emit(DashboardEventType.CO2_UPDATE, payload);
  }

  public emitMotionUpdate(payload: MotionEntity): void {
    this.server.emit(DashboardEventType.MOTION_UPDATE, payload);
  }

  public emitFanUpdate(payload: FanStateEntity): void {
    this.server.emit(DashboardEventType.FAN_UPDATE, payload);
  }

  public emitLedUpdate(payload: LedStateEntity): void {
    this.server.emit(DashboardEventType.LED_UPDATE, payload);
  }

  public afterInit(): void {
    console.log('[WebSocket] Server initialized');
  }

  public handleConnection(client: Socket): void {
    console.log(`[WebSocket] Client connected: ${client.id}`);
  }

  public handleDisconnect(client: Socket): void {
    console.log(`[WebSocket] Client disconnected: ${client.id}`);
  }
}
