import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SensorMessageDto {
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @IsInt()
  value: number;

  @IsString()
  @IsNotEmpty()
  timestamp: string;
}
