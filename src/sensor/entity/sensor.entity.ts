import { SelectCo2 } from '../prisma-type/select-co2';
import { SelectHumidity } from '../prisma-type/select-humidity';
import { SelectMotion } from '../prisma-type/select-motion';
import { SelectTemperature } from '../prisma-type/select-temperature';

export class SensorEntity {
  temperature: SelectTemperature | null;
  humidity: SelectHumidity | null;
  co2: SelectCo2 | null;
  motion: SelectMotion | null;

  constructor(
    temperature: SelectTemperature | null,
    humidity: SelectHumidity | null,
    co2: SelectCo2 | null,
    motion: SelectMotion | null,
  ) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.co2 = co2;
    this.motion = motion;
  }
}
