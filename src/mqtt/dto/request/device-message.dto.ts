import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ModeType } from 'src/device/constants/mode.type';
import { StateType } from 'src/device/constants/state.type';

export class DeviceMessageDto {
  @IsEnum(ModeType)
  mode: ModeType;

  @IsEnum(StateType)
  state: StateType;
}
