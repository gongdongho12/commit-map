# 🗺️ Commit Map - 나만의 여행 지도 블로그

<p align="center">
  <img src="https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

> **여행 경로를 지도 위에 시각화하고, 마크다운으로 기록하는 개인 여행 블로그**

여행 다녀오고 사진만 폰에 잠들어 있지 않나요? 🤔  
**Commit Map**으로 나만의 여행 지도를 만들어보세요!

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 🗺️ **인터랙티브 지도** | 여행 경로가 지도 위에 자동으로 연결되어 표시 |
| 📍 **장소별 마커** | 관광지, 맛집, 호텔, 공항 등 타입별 아이콘 구분 |
| 📅 **타임라인 뷰** | 날짜별로 여행 일정을 한눈에 |
| 🎯 **D-Day 배지** | 예정된 여행은 D-Day 카운트다운! |
| 🌍 **다국가 여행** | 여러 나라를 경유하는 여행도 완벽 지원 |
| 📝 **마크다운 작성** | 익숙한 마크다운으로 자유롭게 기록 |
| 🚀 **GitHub Pages 배포** | 무료로 나만의 여행 블로그 운영 |

## 🎬 미리보기

```
🏠 메인 페이지: 여행 카드 목록 + 지도 미리보기
📍 상세 페이지: 인터랙티브 지도 + 경로 연결 + 장소 팝업
📅 타임라인: 날짜별 일정 정리
```

## 🚀 5분 만에 시작하기

### 1️⃣ 레포지토리 Fork & Clone

```bash
# 이 레포를 Fork한 후
git clone https://github.com/YOUR_USERNAME/commit-map.git
cd commit-map
```

### 2️⃣ 의존성 설치 & 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:4321` 접속! 🎉

### 3️⃣ 나만의 여행 추가

`src/content/posts/` 폴더에 마크다운 파일 생성:

```yaml
---
title: "2026 도쿄 여행"
date: 2026-01-30
endDate: 2026-02-02
country: "일본"
tripType: ["sightseeing", "food"]
locations:
  - name: "나리타 공항"
    lat: 35.7720
    lng: 140.3929
    type: airport
    visitDate: "1/30"
    
  - name: "도쿄 스카이트리"
    lat: 35.7101
    lng: 139.8107
    type: attraction
    visitDate: "1/31"
    note: "634m 전망대에서 도쿄 야경!"
---

# 여행 후기
마크다운으로 자유롭게 작성하세요!
```

### 4️⃣ GitHub Pages 배포 (무료!)

1. GitHub에서 Fork한 레포로 이동
2. **Settings** → **Pages** → Source: **GitHub Actions** 선택
3. 코드 Push하면 자동 배포! 🚀

```
https://YOUR_USERNAME.github.io/commit-map
```

## 📁 프로젝트 구조

```
commit-map/
├── src/
│   ├── content/
│   │   └── posts/          # 👈 여기에 여행 포스트 추가!
│   │       ├── 2026-01-30-tokyo.md
│   │       └── 2026-02-12-bali.md
│   ├── components/         # 지도, 카드 등 컴포넌트
│   ├── layouts/            # 페이지 레이아웃
│   └── pages/              # 라우트 페이지
└── public/                 # 이미지 등 정적 파일
```

## 📝 포스트 작성 가이드

### 파일명 규칙
```
YYYY-MM-DD-제목.md
예: 2026-01-30-tokyo-kawaguchiko.md
```

### 필수 필드

| 필드 | 설명 | 예시 |
|------|------|------|
| `title` | 여행 제목 | `"2026 도쿄 여행"` |
| `date` | 시작일 | `2026-01-30` |
| `country` | 대표 국가 | `"일본"` |
| `locations` | 장소 목록 | 아래 참조 |

### 장소(Location) 필드

| 필드 | 필수 | 설명 |
|------|:----:|------|
| `name` | ✅ | 장소 이름 |
| `lat` | ✅ | 위도 (Google Maps에서 확인) |
| `lng` | ✅ | 경도 |
| `type` | ⭕ | `attraction`, `restaurant`, `hotel`, `airport`, `cafe`, `shopping`, `nature`, `temple` 등 |
| `visitDate` | ⭕ | 방문일 `"1/30"` |
| `note` | ⭕ | 짧은 메모 |
| `order` | ⭕ | 방문 순서 (경로 연결용) |
| `link` | ⭕ | 구글맵 링크 등 |

### 여행 테마 (tripType)

```yaml
tripType: ["sightseeing", "food", "nature", "culture", "shopping", "healing", "adventure"]
```

## 🤖 AI로 포스트 자동 생성하기 (Antigravity)

이 프로젝트에는 **Antigravity** (구글 AI 코딩 어시스턴트) 워크플로우가 내장되어 있습니다!  
프로젝트를 clone하고 Antigravity로 열면, 자연어로 여행 일정만 말해도 포스트가 자동 생성됩니다.

### 사용 방법

1. **VSCode에서 Antigravity 확장 설치**
2. **이 프로젝트 clone 후 열기**
3. **프롬프트 입력창에 `/add-content-field` + 여행 일정 입력!**

### 실제 사용 예시

프롬프트 입력창에 이렇게 입력하면:

```
/add-content-field 26년 1월 30일부터 2/2일 도쿄 여행이야
30일부터 2/1일까진 가와구치코에 시키-노-야도 후지산에서 온천 숙박하면서 
불꽃축제, 사케증류소 견학, 후지산 전망, 로프웨이 즐기고 
2/1일에 도쿄 아사쿠사 와서 일루미네이션이랑 빅카메라에서 면세쇼핑할거야
나리타 공항 출도착이야 오후 12시 도착, 15시 40분 이륙
```

**AI가 자동으로:**
- ✅ `src/content/posts/2026-01-30-tokyo-kawaguchiko.md` 파일 생성
- ✅ 모든 장소의 좌표(lat, lng) 자동 입력
- ✅ 날짜별 일정표, 하이라이트, 여행 팁 작성
- ✅ 적절한 태그, 카테고리, 장소 타입 설정

### 더 많은 예시

```
/add-content-field 2/12일 자카르타 가서 3박, 뜨만사파리 방문하고 
마사지 받고 리모트 근무하고, 2/15일 싱가포르에서 1박 두리안 먹고
2/16일 발리 와서 사누르에서 스쿠버다이빙 3일 할거야
```

```
/add-content-field 3/28일 마카오 공항 12시 도착
소피텔 마카오 2박, 카지노 구경하고 에펠탑 보고 육포 사고 딤섬 먹을거야
```

> 💡 **팁**: 숙소명, 관광지, 맛집, 액티비티 등을 자연어로 자유롭게 설명하면 AI가 알아서 구조화해줍니다!

## 💡 팁 & 트릭

### 좌표 찾는 법
1. [Google Maps](https://maps.google.com) 접속
2. 원하는 장소 우클릭
3. 좌표 클릭하면 복사됨! (예: `35.7101, 139.8107`)

### D-Day 배지
- `date`가 오늘 이후면 자동으로 **D-30** 같은 배지 표시
- 여행 끝나면 자동으로 "최근 여행"으로 이동

### 다국가 여행
```yaml
countries: ["일본", "한국"]  # 여러 나라 경유 시
locations:
  - name: "도쿄"
    country: "일본"         # 장소별 국가 지정
```

## 🤝 기여하기

버그 리포트, 기능 제안, PR 모두 환영합니다! 🙌

1. Fork
2. Feature 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 커밋 (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Pull Request!

## 📄 라이선스

MIT License - 자유롭게 사용하세요!

---

<p align="center">
  <b>🌏 여행을 기록하고, 추억을 지도 위에 남기세요!</b><br>
  Made with ❤️ by travelers, for travelers
</p>
