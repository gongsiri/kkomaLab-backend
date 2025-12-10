import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: process.env.CORS_ORIGINS?.split(','), credentials: true },
})
export class DashboardGateway {
  @WebSocketServer()
  server: Server;

  public afterInit(): void {
    console.log('[WebSocket] Server initialized');
  }

  public handleConnect(client: Socket): void {
    console.log(`[WebSocket] Client connected: ${client.id}`);
  }

  public handleDisconnect(client: Socket): void {
    console.log(`[WebSocket] Client disconnected: ${client.id}`);
  }
}
