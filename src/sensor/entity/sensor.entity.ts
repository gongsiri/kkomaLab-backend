import { SelectCo2 } from '../prisma-type/select-co2';
import { SelectHumidity } from '../prisma-type/select-humidity';
import { SelectMotion } from '../prisma-type/select-motion';
import { SelectTemperature } from '../prisma-type/select-temperature';

export class SensorEntity {
  temperatureList: SelectTemperature[];
  humidityList: SelectHumidity[];
  co2List: SelectCo2[];
  motion: SelectMotion | null;

  constructor(
    temperatureList: SelectTemperature[],
    humidityList: SelectHumidity[],
    co2List: SelectCo2[],
    motion: SelectMotion | null,
  ) {
    this.temperatureList = temperatureList;
    this.humidityList = humidityList;
    this.co2List = co2List;
    this.motion = motion;
  }
}
