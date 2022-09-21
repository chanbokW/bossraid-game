# 보스레이드 PVE 컨텐츠

## 목차

- [트러블슈팅](#2-트러블슈팅)
- [stack](#📚-stacks)
- [입장조건](#3-입장-가능-조건)
- [API명세서](#4-api-명세서)

### 1. 기능 명세

- 유저 생성
- 유저 조회
- 보스레이드 상태 조회
- 보스레이드 시작
- 보스레이드 종료
- 랭킹 조회

### 📚 STACKS

<div align="center">
  <img src="https://img.shields.io/badge/node-16.17.0-339933?logo=node.js"> 
  <img src="https://img.shields.io/badge/NestJS-9.0.0-E0234E?logo=NestJS"> 
  <img src="https://img.shields.io/badge/TypeScript-4.4.5-3178C6?logo=typescript"> 
  <img src="https://img.shields.io/badge/mysql-8.0.12-4479A1?logo=mysql">

  <img src="https://img.shields.io/badge/TypeORM-0.3.9-010101"> 
</div>

### 2. 트러블슈팅

- 게임을 시작시 회원이 동시에 입장시 동시성 문제가 발생
  - 동시성 이슈를 해결하기 위해 데이터베이스 select조회시 락을 걸어 해결 하였습니다.
  - 레디스를 이용하여 락을거는 방식을 찾아보게 되었습니다. 그러나 레디스 학습이 부족하여 구현을 하지못하였음(추 후에 학습후 구현 해볼 예정)
  - 큐를 직접 구현하여 레이드건에 대한 정보를 넣은 후 스케쥴러로 5초마다 순차처리 조회 시도

### 3. 입장 가능 조건

- 한번에 한 명의 유저만 보스레이드를 진행할 수 있습니다.
- 아무도 보스레이드를 시작한 기록이 없다면 시작 가능합니다.
- 시작한 기록이 있다면 마지막으로 시작한 유저가 보스레이드를 종료했거나, 시작한 시간으로부터 레이드 제한시간만큼 경과되었어야 합니다.

  ![이미지](./img/%EC%9E%85%EC%9E%A5%EC%A0%84%20%EC%9D%B4%EB%AF%B8%EC%A7%80.jpeg)

  ![이미지](./img/%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202022-09-21%20195905.png)

  ###### [클라이언트 화면 예시] 입장 불가 ( userId 2에 해당하는 유저가 시작 후 아직 종료하지 않았음 )

# 4. API 명세서

https://documenter.getpostman.com/view/21008830/2s7Z7YGszx
