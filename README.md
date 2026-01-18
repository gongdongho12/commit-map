# Commit Map

나만의 여행 지도를 만들고 기록하는 블로그 프로젝트입니다. Astro, React Leaflet을 사용하여 구현되었습니다.

## 🚀 프로젝트 구조

```text
/
├── public/                 # 정적 파일 (이미지, 파비콘 등)
├── src/
│   ├── components/         # 재사용 가능한 컴포넌트 (지도, 댓글 등)
│   ├── content/
│   │   └── posts/          # 여행 포스트 마크다운 파일 (.md) 위치
│   ├── layouts/            # 페이지 레이아웃
│   └── pages/              # 라우트 페이지 (index.astro, timeline.astro)
└── package.json
```

## 📝 포스트 작성 방법

`src/content/posts/` 폴더에 `.md` 파일을 생성하여 여행 기록을 작성합니다.

### 1. 파일명 규칙
`YYYY-MM-DD-제목.md` 형식을 권장합니다. (예: `2024-12-24-europe-winter.md`)
> **주의:** URL은 파일명에서 `.md`를 제외한 이름으로 생성됩니다.

### 2. Frontmatter 구조
파일 상단에 위치한 메타데이터입니다. 아래 형식을 복사해서 사용하세요.

```yaml
---
title: "여행 제목"
date: 2024-12-24                # 여행 시작일 (필수)
endDate: 2025-01-04             # 여행 종료일 (선택)
country: "대표 국가"             # 목록에 표시될 대표 국가
countries: ["국가1", "국가2"]     # 여러 국가를 여행한 경우 (필수 아님, 있으면 country보다 우선)
tripType: ["sightseeing", "food"] # 여행 테마 (sightseeing, food, nature, culture, shopping, healing 등)
tags: ["태그1", "태그2"]
excerpt: "목록에 표시될 짧은 요약글"
locations:                      # 지도에 표시될 장소 목록 (순서대로 연결됨)
  - name: "장소 이름"
    lat: 37.1234                # 위도
    lng: 127.5678               # 경도
    type: attraction            # 장소 유형 (attraction, restaurant, cafe, hotel, airport, transport, nature 등)
    order: 1                    # 방문 순서
    country: "국가명"            # (다국가 여행시 필수) 해당 장소의 국가
    note: "짧은 메모 (선택)"
    link: "https://..."         # 외부 링크 (선택, 입력 시 지도 팝업에 표시)
    visitDate: "3/13"           # 방문 날짜 (선택, "MM/DD" 형식, 타임라인 그룹핑용)
    contents:                   # 장소에 대한 상세 설명 (선택)
      - heading: "소제목"
        text: "설명 내용"
    images:                     # 이미지 (선택)
      - src: "이미지 URL"
        alt: "대체 텍스트"
---

# 본문 내용
여기부터는 마크다운으로 자유롭게 작성하세요.
```

## 🗓️ 여행 계획 & 최근 여행
- **여행 계획**: `date`가 오늘 이후인 포스트는 자동으로 '여행 계획' 섹션에 표시됩니다. (D-day 배지 표시)
- **최근 여행**: 완료된 여행은 '최근 여행' 섹션에 표시됩니다. (여행 기간 배지 표시)

## 🧞‍♂️ genie 사용법

### 로컬 실행
```bash
npm install
npm run dev
```

### 배포
GitHub main 브랜치에 푸시하면 GitHub Actions를 통해 자동으로 배포됩니다.
