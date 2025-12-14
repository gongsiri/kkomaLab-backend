export enum MqttType {
  TEMPERATURE = 'temperature',
  HUMIDITY = 'humidity',
  CO2 = 'co2',
  MOTION_DETECT = 'motion-detect',

  FAN_STATE = 'fan/state',
  LIGHT_STATE = 'light/state',

  FAN_COMMAND = 'fan/cmd',
  LIGHT_COMMAND = 'light/cmd',
}
