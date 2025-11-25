import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ModeType } from 'src/device/constants/mode.type';

export class DeviceMessageDto {
  @IsEnum(ModeType)
  mode: ModeType;

  @IsBoolean()
  isOn: boolean;
}
