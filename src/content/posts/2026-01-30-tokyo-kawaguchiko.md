---
title: "2026 도쿄·가와구치코: 후지산 온천 & 도쿄 쇼핑"
date: 2026-01-30
endDate: 2026-02-02
country: "일본"
tripType: ["healing", "sightseeing", "shopping", "food"]
expenses:
  - category: bus
    title: "나리타 공항 LCB 버스"
    date: "2026-01-30"
    amount: 1500
    currency: "JPY"
    unit: "구간"
    linkedLocation: "나리타 국제공항 제2터미널"
    note: "나리타 공항에서 도쿄역까지 이동"
  - category: bus
    title: "도쿄역-가와구치코 고속버스"
    date: "2026-01-30"
    amount: 2300
    currency: "JPY"
    unit: "구간"
    linkedLocation: "도쿄역"
    note: "15:30 출발편"
  - category: bus
    title: "가와구치코 주유버스"
    date: "2026-01-30"
    amount: 180
    currency: "JPY"
    unit: "구간"
    linkedLocation: "시키노야도 (四季の宿)"
    note: "가와구치코역에서 숙소까지 이동"
  - category: activity
    title: "2일 버스 패스 + 로프웨이 + 유람선 세트"
    date: "2026-01-31"
    amount: 3300
    currency: "JPY"
    unit: "세트"
    linkedLocation: "가와구치코"
  - category: activity
    title: "사케 양조장 투어"
    date: "2026-01-31"
    amount: 1500
    currency: "JPY"
    unit: "명"
    linkedLocation: "이데 양조장"
  - category: food
    title: "가와구치코 간식"
    date: "2026-01-31"
    amount: 400
    currency: "JPY"
    quantity: 2
    unit: "개"
    note: "쿠키 200엔 x 2개"
  - category: activity
    title: "바람동굴 + 얼음동굴 세트 입장권"
    date: "2026-02-01"
    amount: 600
    currency: "JPY"
    unit: "세트"
    linkedLocation: "후가쿠 풍혈"
  - category: bus
    title: "가와구치코-바스타 신주쿠 고속버스"
    date: "2026-02-01"
    amount: 2000
    currency: "JPY"
    unit: "구간"
    linkedLocation: "가와구치코역"
    note: "사전예약"
  - category: train
    title: "도쿄 지하철 24시간권"
    date: "2026-02-01"
    amount: 800
    currency: "JPY"
    unit: "권"
  - category: train
    title: "아사쿠사-나리타 액세스 특급"
    date: "2026-02-02"
    amount: 1000
    currency: "JPY"
    unit: "구간"
    note: "24시간권 활용 후 나리타 이동"
locations:
  # Day 1: 1/30 - 나리타 → 가와구치코
  - name: "나리타 국제공항 제2터미널"
    lat: 35.7647
    lng: 140.3864
    visitDate: "1/30"
    type: airport
    order: 1
    link: ""
    note: "오후 도착, LCB로 도쿄역까지 이동 (1,500엔)"
    contents:
      - heading: "💡 교통 팁"
        text: "LCB 버스로 도쿄역까지 1,500엔. 저렴하고 편리!"

  - name: "도쿄역"
    lat: 35.6812
    lng: 139.7671
    visitDate: "1/30"
    type: transport
    order: 2
    link: ""
    note: "가와구치코행 고속버스 탑승 (15:30, 2,300엔)"
    contents:
      - heading: "💡 교통 팁"
        text: "도쿄역에서 가와구치코 직행 버스. 약 2시간 소요."

  - name: "시키노야도 (四季の宿)"
    lat: 35.5071
    lng: 138.7620
    visitDate: "1/30"
    type: hotel
    order: 3
    link: ""
    note: "가와구치코 온천 료칸, 2박 숙박"
    contents:
      - heading: "🏨 숙소 정보"
        text: "후지산 전망 온천 료칸에서 힐링. 주유버스로 이동 (180엔)"
      - heading: "💡 팁"
        text: "2일 버스 패스 + 로프웨이 + 유람선 세트 3,300엔이 가성비 좋아요!"

  # Day 2: 1/31 - 가와구치코
  - name: "이데 사케 양조장 (井出醸造店)"
    lat: 35.5021
    lng: 138.7656
    visitDate: "1/31"
    type: attraction
    order: 4
    link: ""
    note: "오전 9:30 양조장 투어 (1,500엔)"
    contents:
      - heading: "🍶 사케 체험"
        text: "후지산 지하수로 만든 깨끗한 사케 맛보기. 투어 예약 필수!"

  - name: "가와구치코 후지산 파노라마 로프웨이 (河口湖 富士山パノラマロープウェイ)"
    lat: 35.5040
    lng: 138.7720
    visitDate: "1/31"
    type: viewpoint
    order: 5
    link: ""
    note: "후지산 파노라마 전망대"
    contents:
      - heading: "🗻 전망"
        text: "해발 1,075m에서 바라보는 후지산과 가와구치코 호수 전경"
      - heading: "💡 팁"
        text: "2일 버스 패스 세트에 포함!"

  - name: "가와구치코 유람선"
    lat: 35.5099
    lng: 138.7565
    visitDate: "1/31"
    type: attraction
    order: 6
    link: ""
    note: "호수에서 바라보는 후지산"
    contents:
      - heading: "🚢 유람선"
        text: "로프웨이와 함께 세트 패스로 이용 가능"

  - name: "FUJIYAMA COOKIE"
    lat: 35.5043
    lng: 138.7717
    visitDate: "1/31"
    type: shopping
    order: 7
    link: ""
    note: "버스 기다리면서 간식 (쿠키 200엔 x 2개)"

  - name: "고슈 호우토우 코사쿠 가와구치코점 (甲州ほうとう小作 河口湖店)"
    lat: 35.4969
    lng: 138.7563
    visitDate: "1/31"
    type: restaurant
    order: 8
    link: ""
    note: "야마나시 명물 호우토우 맛집"
    contents:
      - heading: "🍜 추천 메뉴"
        text: "니쿠 호우토우 + 뎀푸라 세트. 얼큰한 된장 우동 느낌!"
      - heading: "⏰ 대기 시간"
        text: "인기 맛집이라 약 30분 대기"

  - name: "시키노야도 대욕탕 & 족욕"
    lat: 35.5071
    lng: 138.7620
    visitDate: "1/31"
    type: spa
    order: 9
    note: "온천 후 족욕하며 휴식"
    contents:
      - heading: "♨️ 온천"
        text: "동굴은 시간이 안 되어서 패스하고 숙소에서 온천 힐링"

  - name: "가와구치코 불꽃축제"
    lat: 35.5139
    lng: 138.7530
    visitDate: "1/31"
    type: attraction
    order: 10
    link: ""
    note: "오후 8시~8시 20분, 후지산 배경 불꽃놀이!"
    contents:
      - heading: "🎆 河口湖冬花火"
        text: "매년 1~2월 주말에 열리는 겨울 불꽃축제. 호수 위로 쏘아올리는 불꽃이 압권! 진짜 좋았어요."
      - heading: "🍜 푸드트럭"
        text: "축제장 앞 푸드트럭에서 야키소바 사먹음"

  # Day 3: 2/1 - 가와구치코 동굴 → 도쿄 아사쿠사
  - name: "나루사와 바람동굴 (鳴沢風穴)"
    lat: 35.4575
    lng: 138.6678
    visitDate: "2/1"
    type: nature
    order: 11
    link: ""
    note: "오전 9:18 첫차 (그린라인) 타고 이동"
    contents:
      - heading: "🕳️ 동굴 탐방"
        text: "바람동굴 + 얼음동굴 세트 600엔 (각각 350엔)"
      - heading: "💡 팁"
        text: "동굴 안은 서늘하니 겉옷 챙기세요!"

  - name: "후지 얼음동굴 (富岳氷穴)"
    lat: 35.4587
    lng: 138.6606
    visitDate: "2/1"
    type: nature
    order: 12
    link: ""
    note: "얼음동굴에서 블루라인으로 가와구치코역 복귀"
    contents:
      - heading: "🧊 얼음동굴"
        text: "1년 내내 얼음이 있는 신비로운 동굴"

  - name: "규카츠 전문점 고슈야 (牛かつ専門店 甲州家)"
    lat: 35.5097
    lng: 138.7709
    visitDate: "2/1"
    type: restaurant
    order: 13
    link: ""
    note: "규카츠 맛집! 별점 높은데 줄도 없어서 좋았음"
    contents:
      - heading: "🥩 추천"
        text: "규카츠가 정말 맛있었어요! 가와구치코 숨은 맛집"

  - name: "가와구치코 허브관 (河口湖ハーブ館)"
    lat: 35.5074
    lng: 138.7619
    visitDate: "2/1"
    type: shopping
    order: 14
    link: ""
    note: "라벤더 소프트 아이스크림 맛봄"

  - name: "바스타 신주쿠"
    lat: 35.6896
    lng: 139.7006
    visitDate: "2/1"
    type: transport
    order: 15
    link: ""
    note: "가와구치코역에서 버스로 이동 (2,000엔 사전예약)"
    contents:
      - heading: "💡 팁"
        text: "사전예약하면 2,000엔! 레드라인으로 가와구치코역 가서 탑승"

  - name: "센소지 (아사쿠사)"
    lat: 35.7148
    lng: 139.7967
    visitDate: "2/1"
    type: temple
    order: 16
    link: ""
    note: "도쿄 서브웨이 24시간권으로 이동"
    contents:
      - heading: "🎫 교통"
        text: "도쿄 메트로 24시간권으로 아사쿠사 이동"

  - name: "아사쿠사 일루미네이션"
    lat: 35.7120
    lng: 139.7995
    visitDate: "2/1"
    type: attraction
    order: 17
    link: ""
    note: "겨울밤 아사쿠사의 환상적인 조명"
    contents:
      - heading: "✨ 야경"
        text: "스카이트리와 센소지를 배경으로 펼쳐지는 일루미네이션"

  - name: "우시미츠 (牛光)"
    lat: 35.7137
    lng: 139.7996
    visitDate: "2/1"
    type: restaurant
    order: 18
    link: ""
    note: "소고기 덮밥 맛집!"
    contents:
      - heading: "🍚 추천"
        text: "아사쿠사에서 저녁으로 소고기 덮밥. 맛있었어요!"

  - name: "APA 호텔 아사쿠사 에키마에"
    lat: 35.7082
    lng: 139.7955
    visitDate: "2/1"
    type: hotel
    order: 19
    link: ""
    note: "아사쿠사역 앞 숙소"
    contents:
      - heading: "💡 귀국 팁"
        text: "나리타 엑세스 특급으로 나리타공항까지 저렴하고 빠르게!"

  # Day 4: 2/2 - 도쿄 쇼핑 → 귀국
  - name: "돈키호테 아사쿠사"
    lat: 35.7140
    lng: 139.7931
    visitDate: "2/2"
    type: shopping
    order: 20
    link: ""
    note: "면세 쇼핑! 24시간 영업"
    contents:
      - heading: "💰 면세"
        text: "여권 지참 시 소비세 10% 면세 혜택. 다양한 상품 한곳에서!"

  - name: "나리타 국제공항 (출발)"
    lat: 35.7720
    lng: 140.3929
    visitDate: "2/2"
    type: airport
    order: 21
    link: ""
    note: "15:40 이륙, 즐거운 여행 끝!"

tags: ["일본", "도쿄", "가와구치코", "후지산", "온천", "료칸", "쇼핑", "불꽃축제", "동굴", "호우토우", "규카츠"]
excerpt: "후지산 온천 료칸에서 힐링하고, 동굴 탐방, 불꽃축제, 도쿄 아사쿠사 일루미네이션까지!"
---

# 2026 도쿄·가와구치코: 후지산 온천 & 도쿄 쇼핑

후지산이 보이는 가와구치코 온천 료칸에서 힐링하고, 동굴 탐방, 불꽃축제, 도쿄 아사쿠사에서 겨울 일루미네이션과 맛집 탐방!

## 📍 여행 개요

- **기간**: 2026년 1월 30일 ~ 2월 2일 (3박 4일)
- **경로**: 나리타 IN → 도쿄역 → 가와구치코 (2박) → 신주쿠 → 아사쿠사 (1박) → 나리타 OUT
- **테마**: 온천 힐링 + 후지산 전망 + 동굴 탐방 + 도쿄 쇼핑
- **교통**: 렌트 없이 대중교통으로!

## 🗓️ 일정 요약

| 날짜 | 지역 | 주요 일정 |
|------|------|----------|
| 1/30 | 나리타→가와구치코 | LCB→도쿄역→버스→**시키노야도 체크인** |
| 1/31 | 가와구치코 | 사케 양조장, 로프웨이, 유람선, 호우토우, **불꽃축제** |
| 2/1 | 가와구치코→도쿄 | **바람/얼음동굴**, 규카츠, 바스타신주쿠, **아사쿠사 일루미네이션** |
| 2/2 | 도쿄 | **돈키호테 면세쇼핑**, 나리타 출발(15:40) |

## 일정 타임라인

```mermaid
timeline
  title 2026 도쿄·가와구치코 - 후지산 온천 & 도쿄 쇼핑
  1/30 나리타→가와구치코 : LCB→도쿄역→버스→시키노야도 체크인
  1/31 가와구치코 : 사케 양조장
              : 로프웨이
              : 유람선
              : 호우토우
              : 불꽃축제
  2/1 가와구치코→도쿄 : 바람/얼음동굴
              : 규카츠
              : 바스타신주쿠
              : 아사쿠사 일루미네이션
  2/2 도쿄 : 돈키호테 면세쇼핑
              : 나리타 출발(15시40)
```


## 💰 교통비 정리

| 구간 | 교통편 | 비용 |
|------|--------|------|
| 나리타 → 도쿄역 | LCB 버스 | 1,500엔 |
| 도쿄역 → 가와구치코 | 고속버스 (15:30) | 2,300엔 |
| 가와구치코 역 → 숙소 | 주유버스 | 180엔 |
| 2일 버스 패스 + 로프웨이 + 유람선 | 세트 패스 | 3,300엔 |
| 바람동굴 + 얼음동굴 | 세트 입장권 | 600엔 |
| 가와구치코 → 바스타 신주쿠 | 고속버스 (사전예약) | 2,000엔 |
| 도쿄 지하철 | 24시간권 | 800엔 |
| 아사쿠사 → 나리타 | 나리타 엑세스 특급 (24시간권 활용) | 1,000엔 |

> 📌 **주유버스 정보**: https://www.fujikyubus.co.jp/shuyu

## 🗻 하이라이트

### 시키노야도 (1/30-2/1, 2박)
- 가와구치코 온천 료칸
- 대욕탕 & 족욕 힐링
- 주유버스로 180엔에 이동

### 이데 사케 양조장 투어 (1/31)
- 오전 9:30 투어 시작 (1,500엔)
- 후지산 지하수로 만든 사케 시음

### 로프웨이 & 유람선 (1/31)
- 2일 버스 패스 세트로 가성비 좋게!
- 카치카치야마에서 후지산 파노라마 전망

### 호우토우 맛집 (1/31)
- 甲州ほうとう小作 河口湖店
- 니쿠 호우토우 + 뎀푸라 세트
- 대기 약 30분 (인기 맛집!)

### 가와구치코 불꽃축제 (1/31)
- 오후 8시~8시 20분
- 후지산을 배경으로 펼쳐지는 환상적인 불꽃놀이
- 푸드트럭에서 야키소바 먹으면서 관람

### 바람동굴 & 얼음동굴 (2/1)
- 오전 9:18 첫차 (그린라인) 이용
- 세트 입장권 600엔
- 얼음동굴에서 블루라인으로 복귀

### 규카츠 맛집 - 甲州家 (2/1)
- 별점 높은데 줄이 없어서 바로 입장
- 규카츠 진짜 맛있었음!

### 아사쿠사 일루미네이션 & 우시미츠 (2/1)
- 도쿄 서브웨이 24시간권으로 이동
- 센소지, 일루미네이션 구경
- 우시미츠에서 소고기 덮밥으로 저녁

## 💡 팁

1. **가와구치코 패스**: 2일 버스 패스 + 로프웨이 + 유람선 세트 3,300엔이 가성비 최고!
2. **동굴 세트권**: 바람동굴 + 얼음동굴 세트 600엔 (각각 사면 700엔)
3. **고속버스 예약**: 사전예약하면 더 저렴해요
4. **불꽃축제**: 추우니까 핫팩 필수! 푸드트럭도 있어요
5. **귀국 교통**: 나리타 엑세스 특급이 저렴하고 빠름

---

후지산 아래 온천, 동굴 탐방, 불꽃축제, 그리고 도쿄 맛집까지! 🗻✨
