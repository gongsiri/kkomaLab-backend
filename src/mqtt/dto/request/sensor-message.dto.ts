import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SensorMessageDto {
  @IsNumber()
  value: number;

  @IsString()
  @IsNotEmpty()
  timestamp: string;
}
