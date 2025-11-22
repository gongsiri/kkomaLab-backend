import { Injectable } from '@nestjs/common';
import { DeviceRepository } from './device.repository';

@Injectable()
export class DeviceService {
  constructor(private readonly deviceRepository: DeviceRepository) {}
}
