import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SensorMessageDto {
  @IsInt()
  value: number;

  @IsString()
  @IsNotEmpty()
  timestamp: string;
}
