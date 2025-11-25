import { IsEnum } from 'class-validator';
import { CommandType } from 'src/device/constants/command.type';

export class CommandDto {
  @IsEnum(CommandType)
  command: CommandType;
}
