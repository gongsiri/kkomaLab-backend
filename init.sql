CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE co2
(
  id         uuid                     NOT NULL DEFAULT uuid_generate_v4(),
  device_id  varchar                  NOT NULL,
  ppm        int                      NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id),
);

CREATE TABLE humidity
(
  id         uuid                     NOT NULL DEFAULT uuid_generate_v4(),
  device_id  varchar                  NOT NULL,
  percent    float                    NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TABLE temperature
(
  id         uuid                     NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone NOT NULL DEFAULT NOW(),
  degree     float                    NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE motion_detect
(
  id         uuid                     NOT NULL DEFAULT uuid_generate_v4(),
  device_id  varchar                  NOT NULL,
  signal     boolean                  NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TABLE fan_state
(
  id         uuid                     NOT NULL DEFAULT uuid_generate_v4(),
  device_id  varchar                  NOT NULL,
  mode       varchar                  NOT NULL,
  is_on      boolean                  NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TABLE led_state
(
  id         uuid                     NOT NULL DEFAULT uuid_generate_v4(),
  device_id  varchar                  NOT NULL,
  mode       varchar                  NOT NULL,
  is_on      boolean                  NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE INDEX idx_co2_device_created_at ON co2 (device_id, created_at DESC);
CREATE INDEX idx_humidity_device_created_at ON humidity (device_id, created_at DESC);
CREATE INDEX idx_temperature_device_created_at ON temperature (device_id, created_at DESC);
CREATE INDEX idx_motion_detect_device_created_at ON motion_detect (device_id, created_at DESC);
CREATE INDEX idx_fan_state_device_created_at ON fan_state (device_id, created_at DESC);
CREATE INDEX idx_led_state_device_created_at ON led_state (device_id, created_at DESC);