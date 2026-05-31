---
title: "비와호·나가하마·오사카 4박 5일 여행 계획"
date: 2026-06-03
endDate: 2026-06-07
country: "일본"
tripType: ["nature", "culture", "healing", "food"]
flights:
  - flightNo: "LJ239"
    date: "2026-06-03"
    direction: "outbound"
    note: "인천에서 간사이로 들어가는 출국편"
  - flightNo: "LJ242"
    date: "2026-06-07"
    direction: "return"
    note: "간사이에서 인천으로 돌아오는 귀국편"
expenses:
  - category: flight
    title: "서울-오사카 왕복 항공권"
    date: "2026-06-03"
    amount: 157900
    currency: "KRW"
    relatedFlightNo: "LJ239/LJ242"
    bookingSource: "진에어"
  - category: train
    title: "간사이 패스 4일권"
    date: "2026-06-03"
    amount: 59099
    currency: "KRW"
    quantity: 4
    unit: "일"
  - category: hotel
    title: "그랜드 머큐어 레이크 비와 리조트 & 스파"
    date: "2026-06-03"
    amount: 13872
    currency: "JPY"
    quantity: 3
    unit: "박"
    linkedLocation: "그랜드 머큐어 레이크 비와 리조트 & 스파"
    note: "3박 총액"
  - category: hotel
    title: "HOPETREE TENNOJI"
    date: "2026-06-06"
    amount: 67477
    currency: "KRW"
    quantity: 1
    unit: "박"
    linkedLocation: "HOPETREE TENNOJI"
  - category: activity
    title: "나가하마 오데카케 패스포트"
    date: "2026-06-05"
    amount: 1700
    currency: "JPY"
    linkedLocation: "나가하마 시내"
  - category: activity
    title: "미시간 크루즈"
    date: "2026-06-04"
    amount: 30000
    currency: "KRW"
    linkedLocation: "오쓰항"
  - category: activity
    title: "AZAI FACTORY TOUR"
    date: "2026-06-06"
    amount: 5000
    currency: "JPY"
    quantity: 1
    unit: "명"
    linkedLocation: "나가하마 증류소"
    note: "2026년 6월 6일 14:30 예약, 현지 결제 예정"
locations:
  - name: "인천국제공항"
    lat: 37.4602
    lng: 126.4407
    visitDate: "6/3"
    type: airport
    order: 1
    country: "한국"
    note: "LJ239 탑승, 16:10 출발 예정"

  - name: "간사이국제공항"
    lat: 34.4320
    lng: 135.2304
    visitDate: "6/3"
    type: airport
    order: 2
    country: "일본"
    note: "18:05 도착 예정, 간사이 패스 시작"

  - name: "그랜드 머큐어 레이크 비와 리조트 & 스파"
    lat: 35.3810
    lng: 136.2636
    visitDate: "6/3-6/6"
    type: hotel
    order: 3
    country: "일본"
    note: "비와호 북쪽 나가하마 3박 베이스"
    contents:
      - heading: "숙소"
        text: "나가하마성과 비와호 쪽을 베이스로 3박. 오쓰, 비와코 테라스, 나가하마 시내 일정을 여기서 왕복하는 구성."

  - name: "오쓰항 미시간 크루즈"
    lat: 35.0174
    lng: 135.8546
    visitDate: "6/4"
    type: transport
    order: 4
    country: "일본"
    note: "비와호 남쪽 오쓰항에서 타는 미시간 크루즈"
    contents:
      - heading: "크루즈"
        text: "간사이 패스로 오쓰 쪽 이동 후 비와호를 물 위에서 보는 일정. 시간대는 현지 운항표에 맞춰 조정."

  - name: "비와코 테라스 로프웨이"
    lat: 35.2096
    lng: 135.8859
    visitDate: "6/4"
    type: viewpoint
    order: 5
    country: "일본"
    note: "비와호 전망을 보는 산 위 코스"
    contents:
      - heading: "전망"
        text: "오쓰항 크루즈와 같은 날로 묶되, 날씨가 좋을 때 우선순위를 높이는 일정."

  - name: "나가하마 시내"
    lat: 35.3788
    lng: 136.2641
    visitDate: "6/5"
    type: market
    order: 6
    country: "일본"
    note: "나가하마 오데카케 패스포트로 시내 관광시설 순회"
    link: "https://nagahama-passport.com/"
    contents:
      - heading: "패스"
        text: "나가하마 오데카케 패스포트 정보를 보면서 구로카베 스퀘어, 나가하마성, 시내 상점가를 느슨하게 묶는 날."

  - name: "나가하마 증류소"
    lat: 35.3765
    lng: 136.2699
    visitDate: "6/6"
    type: attraction
    order: 7
    country: "일본"
    note: "AZAI FACTORY TOUR 집합 지점, 14:30 예약"
    contents:
      - heading: "AZAI FACTORY TOUR"
        text: "장하마 증류소에서 시작해 AZAI Factory 숙성고를 둘러보는 약 2.5시간 투어. 참가비 5,000엔, 1명 예약."

  - name: "HOPETREE TENNOJI"
    lat: 34.6448
    lng: 135.5163
    visitDate: "6/6"
    type: hotel
    order: 8
    country: "일본"
    note: "오사카 덴노지 1박, 귀국 전 마지막 숙소"

  - name: "간사이국제공항 출발"
    lat: 34.4320
    lng: 135.2304
    visitDate: "6/7"
    type: airport
    order: 9
    country: "일본"
    note: "LJ242 탑승, 11:10 출발 예정"

  - name: "인천국제공항 도착"
    lat: 37.4602
    lng: 126.4407
    visitDate: "6/7"
    type: airport
    order: 10
    country: "한국"
    note: "13:00 도착 예정"
tags: ["일본", "비와호", "나가하마", "오쓰", "오사카", "진에어", "AZAI FACTORY TOUR"]
excerpt: "진에어 LJ239/LJ242로 간사이를 왕복하고, 비와호·나가하마·AZAI FACTORY TOUR·덴노지를 묶은 4박 5일 여행 계획"
---

# 비와호·나가하마·오사카 4박 5일 여행 계획

6월 초, 인천에서 간사이로 들어가 비와호 북쪽 나가하마를 베이스로 3박 하고, 마지막 1박은 오사카 덴노지에서 마무리하는 일정.

## 여행 개요

- 기간: 2026년 6월 3일 ~ 6월 7일
- 항공: 진에어 LJ239, LJ242
- 숙소: 그랜드 머큐어 레이크 비와 리조트 & 스파 3박, HOPETREE TENNOJI 1박
- 교통/패스: 간사이 패스 4일권, 나가하마 오데카케 패스포트
- 핵심 일정: 오쓰항 미시간 크루즈, 비와코 테라스 로프웨이, AZAI FACTORY TOUR

## 일정 요약

| 날짜 | 지역 | 주요 일정 |
|------|------|----------|
| 6/3 | 인천, 간사이, 나가하마 | LJ239 출국, KIX 도착, 간사이 패스로 나가하마 이동, 그랜드 머큐어 체크인 |
| 6/4 | 오쓰, 비와코 테라스 | 오쓰항 미시간 크루즈, 비와코 테라스 로프웨이, 나가하마 귀환 |
| 6/5 | 나가하마 | 나가하마 오데카케 패스포트로 시내 산책, 구로카베 스퀘어와 비와호 주변 |
| 6/6 | 나가하마, 오사카 | 오전 나가하마 여유 일정, 14:30 AZAI FACTORY TOUR, 저녁 덴노지 이동 |
| 6/7 | 오사카, 간사이, 인천 | HOPETREE TENNOJI 체크아웃, KIX 이동, LJ242 귀국 |

## 6/3 - 간사이 입국 후 나가하마로 이동

LJ239는 인천에서 오후 출발이라 첫날은 이동 중심으로 잡는 편이 좋다. 간사이에 도착하면 간사이 패스를 바로 쓰는 흐름으로 나가하마까지 이동하고, 그랜드 머큐어 레이크 비와 리조트 & 스파에 체크인한다.

도착 시간이 늦은 편이라 첫날은 숙소 주변에서 가볍게 정리하고 쉬는 날. 다음 날 오쓰와 비와코 테라스까지 이동해야 하니 무리해서 시내 일정을 넣지 않는 구성이 좋다.

## 6/4 - 오쓰항 미시간 크루즈와 비와코 테라스

둘째 날은 비와호 남쪽 오쓰로 내려가 미시간 크루즈를 타는 날. 오쓰항에서 비와호를 물 위에서 보는 일정이라, 이번 여행의 호수 테마가 가장 잘 드러나는 코스다.

날씨가 괜찮다면 비와코 테라스 로프웨이까지 함께 묶는다. 비와호는 날씨 영향을 많이 받으니, 흐리거나 비가 오면 이 일정은 6/5와 바꾸는 식으로 유연하게 운용하는 게 좋다.

## 6/5 - 나가하마 오데카케 패스포트

셋째 날은 나가하마에 집중하는 날. 나가하마 오데카케 패스포트 정보를 기준으로 시내를 느슨하게 돌고, 구로카베 스퀘어, 나가하마성, 비와호 산책을 묶는다.

전날 오쓰와 비와코 테라스 이동이 길기 때문에 이 날은 너무 빡빡하게 잡지 않는 편이 좋다. 카페나 상점가, 지역 음식까지 보면서 나가하마의 속도를 맞추는 날로 둔다.

## 6/6 - AZAI FACTORY TOUR와 덴노지 이동

오전에는 체크아웃 전후로 나가하마에서 여유 있게 움직이고, 14:30에 예약한 AZAI FACTORY TOUR로 이동한다. 투어는 나가하마 증류소에서 시작해 AZAI Factory 숙성고를 둘러보는 구성이고, 약 2.5시간 정도로 잡는다.

투어가 끝난 뒤에는 오사카 덴노지로 이동해 HOPETREE TENNOJI에 체크인한다. 마지막 밤은 다음 날 오전 KIX 이동을 고려해 덴노지 주변에서 가볍게 저녁을 먹고 정리하는 흐름이 좋다.

## 6/7 - 오전 귀국

마지막 날은 LJ242가 11:10 출발이라 아침부터 바로 공항 이동 모드. 덴노지에서 간사이공항으로 이동해 체크인하고, 13:00 인천 도착 예정으로 여행을 마무리한다.
