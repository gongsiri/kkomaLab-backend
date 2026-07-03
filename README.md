# 꼬마랩

> IoT 센서를 활용해 강의실의 온도, 습도, 이산화탄소 농도와 재실 상태를 수집하고, 상태에 따라 팬과 LED를 제어하는 스마트 강의실 환경 관리 시스템입니다.
> 
> 본 저장소는 팀 프로젝트로 진행한 원본 저장소에서 백엔드 코드를 가져와 개인 포트폴리오 목적으로 정리한 저장소입니다.

---

## 프로젝트 개요
'꼬마랩'은 강의실의 환경 데이터를 실시간으로 수집하고, 측정된 환경과 재실 상태에 따라 장치를 자동으로 제어하는 IoT 기반 시스템입니다.

Arduino UNO R4 WiFi 기반 Edge Device는 온도, 습도, 이산화탄소 농도 및 재실 상태를 측정해 MQTT Broker로 전송합니다.

센서값을 이용한 자동 제어는 Edge Device 내부에서 수행합니다.

- 이산화탄소 농도에 따른 팬 자동 제어
- 재실 감지 결과에 따른 LED 자동 제어
- 수동 제어 모드에서 사용자가 지정한 팬 상태 유지

본 백엔드 서버는 Edge Device가 발행한 온도, 습도, 이산화탄소, 재실 상태 및 팬 상태 메시지를 MQTT Topic별로 수신해 PostgreSQL에 저장합니다.

웹 대시보드가 현재 상태를 조회할 수 있도록 REST API를 제공하며, 새롭게 수신된 센서 데이터와 장치 상태는 WebSocket을 통해 실시간으로 전달합니다.

사용자가 웹 대시보드에서 팬 수동 제어를 요청하면 백엔드는 REST API로 요청을 받은 뒤 MQTT 명령으로 변환해 Edge Device에 전달합니다.

팬 상태는 API 요청 시점에 임의로 변경하지 않고, Edge Device가 명령을 처리한 뒤 다시 발행한 실제 상태 메시지를 기준으로 저장하고 갱신합니다.

```text
센서 데이터 수집

Arduino Edge Device
        ↓ MQTT Publish
Mosquitto Broker
        ↓ MQTT Message Delivery
NestJS Backend
        ↓ Store
PostgreSQL
        ↓ REST API / WebSocket
Web Dashboard
```

```text
수동 제어

Web Dashboard
        ↓ REST API
NestJS Backend
        ↓ MQTT Publish
Mosquitto Broker
        ↓ MQTT Message Delivery
Arduino Edge Device
        ↓ 팬/LED Control
        ↓ MQTT State Publish
Mosquitto Broker
        ↓ MQTT Message Delivery
NestJS Backend
        ↓ Store
PostgreSQL / Web Dashboard
```

---

## 프로젝트 기간

```text
2025.11 ~ 2025.12
```

---

## 주요 기능

- 온도/습도/이산화탄소/재실감지 데이터 수신 및 저장
- 팬/LED 상태 수신 및 저장 및 조회
- 팬/LED 제어 REST API 제공
- MQTT 기반 Edge Device 양방향 통신
- 센서 및 장치 상태 통합 Dashboard 조회
- WebSocket 기반 실시간 상태 전달
- 동일한 재실여부/팬/LED 상태의 중복 저장 방지
- Docker compose 기반 온프레미스 MQTT Broker 및 PostgreSQL 환경 구성

--- 

## 아키텍처
![image](https://github.com/user-attachments/assets/85757256-24a8-49e5-bdfd-909ed78a5895)

## 기술 스택

### Bakcend

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

### Database / ORM

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

### Messaging / Realtime

![MQTT](https://img.shields.io/badge/MQTT-660066?style=for-the-badge&logo=mqtt&logoColor=white)
![Eclipse Mosquitto](https://img.shields.io/badge/Eclipse%20Mosquitto-3C5280?style=for-the-badge&logo=eclipsemosquitto&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)

### Infra

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)


## MQTT Topic

| Topic | 방향 | 설명 |
|---|---|---|
| 'temperature' | Edge Device -> Backend | 온도 데이터 |
| 'humidity' | Edge Device -> Backend | 습도 데이터 |
| 'co2' | Edge Device -> Backend | 이산화탄소 데이터 |
| 'motion-detect' | Edge Device -> Backend | 재실감지 데이터 |
| 'fan/state' | Edge Device -> Backend | 팬 상태 |
| 'light/state' | Edge Device -> Backend | LED 상태 |
| 'fan/cmd' | Backend -> Edge Device | 팬 제어 명령 |
| 'light/cmd' | Backend -> Edge Device | LED 제어 명령 |

--- 

## API 예시

- 'GET /dashboard'
- 'POST /fan'
- 'POST /led'

---

## 담당 역할

본 프로젝트에서 MQTT 기반 NestJS 백엔드를 구현했습니다.

- 온도, 습도, CO₂, 재실 감지 데이터를 MQTT로 수신하고 PostgreSQL에 저장했습니다.
- 팬과 LED 상태를 MQTT로 수신하고 저장했습니다.
- 팬과 LED 제어를 위한 REST API와 MQTT 명령 발행 기능을 구현했습니다.
- 동일한 재실 여부와 팬·LED 상태가 반복될 경우 중복 저장과 WebSocket 전송을 방지했습니다.
- 센서 데이터와 장치 상태를 WebSocket으로 실시간 전달했습니다.
- 최근 센서 데이터와 팬·LED 상태를 통합 조회할 수 있도록 구현했습니다.
- Docker Compose 기반 온프레미스 서버 환경을 구성했습니다.

---

## 트러블슈팅

### 수동 제어 명령과 실제 장치 상태가 일치하지 않을 수 있는 문제

#### Problem

사용자가 대시보드에서 팬이나 LED를 수동으로 제어할 때, REST API의 MQTT 명령 발행이 성공하더라도 Edge Device가 네트워크 문제로 명령을 수신하지 못하거나 실제 장치 제어에 실패할 수 있었습니다.

이 상태에서 API 요청 직후 데이터베이스의 장치 상태를 변경하면, 대시보드에 표시된 상태와 실제 팬/LED 상태가 달라질 수 있었습니다.

#### Solution

REST API는 장치 상태를 직접 변경하지 않고 MQTT 제어 명령 발행만 담당하도록 구성했습니다.

실제 장치 상태는 Edge Device가 명령을 처리한 뒤 Topic으로 다시 발행한 메시지를 기준으로 저장하고, WebSocket을 통해 대시보드에 전달했습니다.

### Result

- MQTT 명령 발행 여부와 실제 장치 상태를 분리했습니다.
- Edge Device가 전달한 실제 상태를 기준으로 DB와 대시보드를 갱신했습니다.
- 대시보드와 물리 장치 간 상태 불일치 가능성을 줄였습니다.

---

## 실행 방법

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경 변수 설정

루트 디렉토리에 '.env' 파일을 생성합니다.

보안상 실제 값은 포함하지 않으며, 아래 구조를 참고하여 설정합니다.

```env example
PORT=
CORS_ORIGINS=
MQTT_URL=
DATABASE_URL=
```

### 3. Docker 실행

```bash
npm run dev:infra:up
```

### 4. Prisma 설정

```bash
npx prisma generate
```

### 5. 서버 실행

```bash
npm run start:dev
```

