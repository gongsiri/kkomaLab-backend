import { SelectCo2 } from '../prisma-type/select-co2';
import { SelectHumidity } from '../prisma-type/select-humidity';
import { SelectMotion } from '../prisma-type/select-motion';
import { SelectTemperature } from '../prisma-type/select-temperature';
import { Co2Entity } from './co2.entity';
import { HumidityEntity } from './humidity.entity';
import { MotionEntity } from './motion.entity';
import { TemperatureEntity } from './temperature.entity';

export class SensorEntity {
  temperatureList: TemperatureEntity[];
  humidityList: HumidityEntity[];
  co2List: Co2Entity[];
  motion: MotionEntity | null;

  constructor(data: SensorEntity) {
    Object.assign(this, data);
  }

  public static fromPrisma(data: {
    temperatureList: SelectTemperature[];
    humidityList: SelectHumidity[];
    co2List: SelectCo2[];
    motion: SelectMotion | null;
  }): SensorEntity {
    return new SensorEntity({
      temperatureList: data.temperatureList.map((temperature) =>
        TemperatureEntity.fromPrisma(temperature),
      ),
      humidityList: data.humidityList.map((humidity) =>
        HumidityEntity.fromPrisma(humidity),
      ),
      co2List: data.co2List.map((co2) => Co2Entity.fromPrisma(co2)),
      motion: data.motion ? MotionEntity.fromPrisma(data.motion) : null,
    });
  }
}
