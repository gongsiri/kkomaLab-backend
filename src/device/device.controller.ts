import { Body, Controller, Post } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CommandDto } from './dto/request/command.dto';

@Controller()
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post('/fan')
  public async publishFanCommand(@Body() dto: CommandDto): Promise<void> {
    return await this.deviceService.publishFanCommand(dto);
  }

  @Post('/led')
  public async publishLedCommand(@Body() dto: CommandDto): Promise<void> {
    return await this.deviceService.publishLedCommand(dto);
  }
}
