import { ModeType } from 'src/device/constants/mode.type';

export class DeviceMessageInput {
  deviceId: string;
  mode: ModeType;
  isOn: boolean;
}
