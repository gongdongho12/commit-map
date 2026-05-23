---
description: Astro Content Collection에 새 필드 추가하는 방법
---

# Astro Content Collection 필드 추가 가이드

> ⚠️ **중요 규칙**:
> 1. 장소(Location)를 추가할 때 **반드시 구글맵에서 검색**하여 정확한 위도/경도를 입력하세요! 임의로 좌표를 추측하지 마세요.
> 2. 장소명은 **한글을 먼저** 쓰고, 괄호 안에 일본어/영어 원어를 넣으세요. 예: `"가와구치코 로프웨이 (河口湖ロープウェイ)"`

Location 데이터나 포스트에 새 필드를 추가할 때 수정해야 하는 파일들:

## 수정해야 하는 파일 요약

| 순서 | 파일 | 설명 |
|------|------|------|
| 1 | `src/content.config.ts` | Zod 스키마에 필드 추가 |
| 2 | `src/components/map/providers/types.ts` | TypeScript 인터페이스에 필드 추가 |
| 3 | `src/pages/posts/[slug].astro` | 데이터 매핑에 필드 추가 |
| 4 | `src/components/map/MapContainer.tsx` | (선택) 지도 Popup에서 렌더링 |

---

## 1. Content Schema 수정 (필수!)

**파일:** `src/content.config.ts`

> ⚠️ **주의**: `src/content/config.ts`가 아니라 `src/content.config.ts`입니다!

### Location에 필드 추가

```typescript
// locationSchema에 새 필드 추가
const locationSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
  type: locationTypeSchema,                   // 장소 타입 enum
  order: z.number().optional(),               // 순서
  note: z.string().optional(),                // 간단한 메모
  link: z.string().optional(),                // 외부 링크 (빈 문자열이면 Google Maps 자동 생성)
  visitDate: z.string().optional(),           // 방문 날짜 (예: "10/1")
  contents: z.array(contentSectionSchema).optional(),  // 상세 콘텐츠 배열
  images: z.array(z.object({                  // 이미지 배열
    src: z.string(),
    alt: z.string().optional(),
    caption: z.string().optional(),
  })).optional(),
  country: z.string().optional(),             // 국가 (필터링용)
});
```

### 새로운 장소 타입(enum) 추가

```typescript
// locationTypeSchema에 새 타입 추가
const locationTypeSchema = z.enum([
  'attraction', 'hotel', 'restaurant', 'cafe', 'transport', 'airport',
  'shopping', 'nature', 'temple', 'museum', 'zoo', 'theater', 'market',
  'beach', 'mountain', 'viewpoint', 'bar', 'palace', 'spa', 'gym', 'church',
  // 여기에 새 타입 추가: 'newType',
]).optional();
```

### 포스트 자체에 필드 추가

```typescript
const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),       // 여행 종료일
    locations: z.array(locationSchema),
    country: z.string(),                       // 나라 (필수)
    countries: z.array(z.string()).optional(), // 여러 나라 경유 시
    tripType: z.array(tripTypeSchema).optional(),
    tags: z.array(z.string()).optional(),
    thumbnail: z.string().optional(),
    excerpt: z.string().optional(),
    draft: z.boolean().optional(),             // 숨김 처리 여부
  }),
});
```

---

## 2. TypeScript 타입 수정

**파일:** `src/components/map/providers/types.ts`

### Location 인터페이스에 필드 추가

```typescript
export interface Location {
  lat: number;
  lng: number;
  name: string;
  slug?: string;
  link?: string;        // 외부 링크
  visitDate?: string;   // 방문 날짜
  order?: number;
  note?: string;
  type?: string;
  date?: Date;
  excerpt?: string;
  country?: string;
  // 여기에 새 필드 추가
}
```

### 새 장소 타입의 아이콘 추가

```typescript
export const locationTypeIcons: Record<string, string> = {
  attraction: '🏛️',
  hotel: '🏨',
  restaurant: '🍽️',
  // ...기존 타입들...
  church: '⛪',
  // 여기에 새 타입 아이콘 추가: newType: '🆕',
};
```

---

## 3. 페이지에서 데이터 전달

**파일:** `src/pages/posts/[slug].astro`

### 두 군데 매핑 수정 필요

```typescript
// 1️⃣ locations 매핑 (전체 데이터 - line 21~32)
const locations = post.data.locations.map((loc, index) => ({
  lat: loc.lat,
  lng: loc.lng,
  name: loc.name,
  order: loc.order ?? index + 1,
  note: loc.note,
  type: loc.type,
  link: loc.link,
  visitDate: loc.visitDate,
  contents: loc.contents,
  images: loc.images,
  // 여기에 새 필드 추가
}));

// 2️⃣ mapLocations 매핑 (지도 컴포넌트용 - line 34~37)
const mapLocations = locations.map(l => ({
  lat: l.lat, lng: l.lng, name: l.name, order: l.order, note: l.note, type: l.type,
  link: l.link, visitDate: l.visitDate,
  // 여기에 새 필드 추가 (지도에서 필요한 경우)
}));
```

### 페이지에서 렌더링

```astro
<!-- link 필드 활용 예시 (line 109~119) -->
<!-- 빈 문자열("")이면 Google Maps 자동 생성, 값이 있으면 해당 링크 사용 -->
{loc.link !== undefined ? (
  <a href={loc.link === '' 
    ? `https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}` 
    : loc.link} 
     target="_blank" rel="noopener noreferrer" class="location-link">
    {loc.name}
    <span class="link-icon">↗</span>
  </a>
) : (
  loc.name
)}

<!-- images 필드 활용 예시 (line 125~134) -->
{loc.images && loc.images.length > 0 && (
  <div class="location-images">
    {loc.images.map(img => (
      <figure class="image-figure">
        <img src={img.src} alt={img.alt || loc.name} loading="lazy" />
        {img.caption && <figcaption>{img.caption}</figcaption>}
      </figure>
    ))}
  </div>
)}

<!-- contents 필드 활용 예시 (line 136~145) -->
{loc.contents && loc.contents.length > 0 && (
  <div class="location-contents">
    {loc.contents.map(content => (
      <div class="content-section">
        {content.heading && <h4>{content.heading}</h4>}
        <p>{content.text}</p>
      </div>
    ))}
  </div>
)}
```

---

## 4. 컴포넌트에서 렌더링 (선택)

**파일:** `src/components/map/MapContainer.tsx`

지도 Popup에서 새 필드를 표시하려면:

```tsx
<Popup>
  {location.visitDate && <div>📅 {location.visitDate}</div>}
  {location.link && (
    <a href={location.link} target="_blank">📍 지도에서 보기 →</a>
  )}
</Popup>
```

---

## 5. 마크다운 파일에서 사용

**파일:** `src/content/posts/*.md`

### 완전한 Location 예시

```yaml
locations:
  - name: "콜로세움"
    lat: 41.8902
    lng: 12.4922
    type: attraction
    order: 1
    note: "로마 제국의 대표적인 건축물"
    link: "https://maps.app.goo.gl/xxx"  # 또는 빈 문자열 ""로 자동 생성
    visitDate: "2/10"
    contents:
      - heading: "💡 팁"
        text: "오전 일찍 가면 줄이 짧아요"
      - heading: "📸 포토 스팟"
        text: "3층에서 전체 전경을 찍을 수 있어요"
    images:
      - src: "/images/rome/colosseum.jpg"
        alt: "콜로세움 전경"
        caption: "해질녘의 콜로세움"
```

### link 필드 사용 패턴

| 값 | 동작 |
|---|---|
| 생략 | 장소명만 텍스트로 표시 (링크 없음) |
| `""` (빈 문자열) | 자동으로 Google Maps 링크 생성 (`lat,lng` 기반) |
| `"https://..."` | 해당 URL로 링크 |

---

## 6. visitDate 기반 그룹핑 기능

`[slug].astro`에서 자동으로 `visitDate`별로 장소를 그룹핑합니다:

```typescript
// visitDate별 그룹핑 (line 52~60)
const groupedByDate = locations.reduce((acc, loc) => {
  const date = loc.visitDate || '날짜 미정';
  if (!acc[date]) acc[date] = [];
  acc[date].push(loc);
  return acc;
}, {} as Record<string, typeof locations>);
```

이 기능을 활용하면 여행 일정별로 장소가 자동 그룹됩니다.

---

## 7. 트러블슈팅

### 스키마 Validation 에러 (Invalid enum value)

**에러 예시:**
```
locations.1.type: Invalid enum value. Expected 'attraction' | ... received 'church'
```

**해결:**
1. `src/content.config.ts`의 `locationTypeSchema`에 새 타입 추가
2. `src/components/map/providers/types.ts`의 `locationTypeIcons`에 아이콘 추가

### 데이터가 undefined로 나올 때

1. `src/content.config.ts` 스키마에 필드가 있는지 확인
2. `src/pages/posts/[slug].astro`의 locations 매핑에 필드를 추가했는지 확인
3. dev 서버 재시작: `npm run dev`
4. 캐시 삭제 후 재시작: `rm -rf .astro && npm run dev`

### 지도에 데이터가 안 보일 때

`mapLocations` 매핑에도 해당 필드를 추가했는지 확인하세요.
