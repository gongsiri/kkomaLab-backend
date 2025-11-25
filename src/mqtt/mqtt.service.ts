import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  public onModuleInit() {}
  public onModuleDestroy() {}
}
