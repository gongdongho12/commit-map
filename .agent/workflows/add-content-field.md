---
description: Astro Content Collection에 새 필드 추가하는 방법
---

# Astro Content Collection 필드 추가 가이드

Location 데이터나 포스트에 새 필드를 추가할 때 수정해야 하는 파일들:

## 1. Content Schema 수정 (필수!)

**`src/content.config.ts`** - 이 파일이 실제 Astro content collection 설정 파일입니다.

```typescript
// locationSchema에 새 필드 추가
const locationSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
  // ... 기존 필드들
  link: z.string().optional(),           // 새로 추가한 필드
  visitDate: z.string().optional(),      // 새로 추가한 필드
});
```

> ⚠️ **주의**: `src/content/config.ts`가 아니라 `src/content.config.ts`입니다!

## 2. TypeScript 타입 수정

**`src/components/map/providers/types.ts`** - Location 인터페이스에 필드 추가

```typescript
export interface Location {
  // ... 기존 필드들
  link?: string;
  visitDate?: string;
}
```

## 3. 페이지에서 데이터 전달

**`src/pages/posts/[slug].astro`** - 두 군데 수정:

```typescript
// locations 매핑에 새 필드 추가
const locations = post.data.locations.map((loc, index) => ({
  // ... 기존 필드들
  link: loc.link,
  visitDate: loc.visitDate,
}));

// mapLocations에도 추가 (MapContainer로 전달)
const mapLocations = locations.map(l => ({
  // ... 기존 필드들
  link: l.link,
  visitDate: l.visitDate,
}));
```

## 4. 컴포넌트에서 렌더링

**`src/components/map/MapContainer.tsx`** - Popup에서 새 필드 표시

```tsx
<Popup>
  {location.visitDate && <div>📅 {location.visitDate}</div>}
  {location.link && (
    <a href={location.link} target="_blank">📍 지도에서 보기 →</a>
  )}
</Popup>
```

## 5. 마크다운 파일에서 사용

**`src/content/posts/*.md`**

```yaml
locations:
  - name: "장소명"
    lat: 35.123
    lng: 127.456
    link: "https://maps.app.goo.gl/xxx"
    visitDate: "10/1"
```

## 6. 트러블슈팅 및 팁

### 스키마 Validation 에러 (Invalid enum value)
`Invalid enum value` 에러가 발생하면 정의된 enum 값과 실제 데이터가 일치하는지 확인해야 합니다.

**에러 예시:**
```
locations.1.type: Invalid enum value. Expected 'attraction' | ... received 'church'
```

**해결:**
1. `src/content.config.ts`의 `locationTypeSchema`에 `'church'` 추가
2. `src/components/map/providers/types.ts`의 `locationTypeIcons`에 아이콘 추가 (예: `church: '⛪'`)

### 상세 설명 추가 (`contents` 필드 활용)
단순 텍스트(`note`)보다 더 풍성한 설명을 추가하고 싶다면 `contents` 배열을 사용하세요.

```yaml
contents:
  - heading: "💡 팁"
    text: "저녁에 가볍게 맥주나 와인 한잔하기 좋아요."
  - heading: "📸 포토 스팟"
    text: "광장 중앙 분수를 배경으로 찍으세요."
```

## 트러블슈팅

데이터가 undefined로 나오면:
1. `src/content.config.ts` 스키마에 필드가 있는지 확인
2. dev 서버 재시작: `npm run dev`
3. 캐시 삭제 후 재시작: `rm -rf .astro && npm run dev`
