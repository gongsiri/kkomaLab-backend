CREATE USER db_admin WITH PASSWORD '1234';

CREATE DATABASE iot OWNER db_admin;

\c iot db_admin

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE co2
(
  id         uuid                     NOT NULL DEFAULT uuid_generate_v4(),
  ppm        int                      NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TABLE humidity
(
  id         uuid                     NOT NULL DEFAULT uuid_generate_v4(),
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
  signal     boolean                  NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TABLE fan_state
(
  id         uuid                     NOT NULL DEFAULT uuid_generate_v4(),
  mode       varchar                  NOT NULL,
  is_on      boolean                  NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TABLE led_state
(
  id         uuid                     NOT NULL DEFAULT uuid_generate_v4(),
  mode       varchar                  NOT NULL,
  is_on      boolean                  NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE INDEX idx_co2_created_at ON co2 (created_at DESC);
CREATE INDEX idx_humidity_created_at ON humidity (created_at DESC);
CREATE INDEX idx_temperature_created_at ON temperature (created_at DESC);
CREATE INDEX idx_motion_detect_created_at ON motion_detect (created_at DESC);
CREATE INDEX idx_fan_state_created_at ON fan_state (created_at DESC);
CREATE INDEX idx_led_state_created_at ON led_state (created_at DESC);