import { defineCollection, z } from 'astro:content';

// 여행 유형 태그
const tripTypeSchema = z.enum([
  'sightseeing',    // 🏛️ 관광
  'healing',        // 🧘 힐링
  'food',           // 🍽️ 맛집 탐방
  'culture',        // 🎭 문화/예술
  'nature',         // 🌲 자연
  'adventure',      // ⛰️ 모험
  'shopping',       // 🛍️ 쇼핑
  'business',       // 💼 출장
  'family',         // 👨‍👩‍👧‍👦 가족여행
  'solo',           // 🚶 혼자여행
]);

// 장소 타입
const locationTypeSchema = z.enum([
  'attraction', 'hotel', 'restaurant', 'cafe', 'transport', 'airport',
  'shopping', 'nature', 'temple', 'museum', 'zoo', 'theater', 'market',
  'beach', 'mountain', 'viewpoint', 'bar', 'palace', 'spa', 'gym', 'church',
]).optional();

// 장소별 콘텐츠 섹션
const contentSectionSchema = z.object({
  heading: z.string().optional(),
  text: z.string(),
});

// 항공편 기록 스키마
const flightSchema = z.object({
  flightNo: z.string(),                         // 예: KE629, LJ123
  date: z.string().optional(),                  // 탑승일. 예: 2026-05-01
  airline: z.string().optional(),               // 항공사명
  from: z.string().optional(),                  // 출발 공항 IATA 코드 또는 도시
  to: z.string().optional(),                    // 도착 공항 IATA 코드 또는 도시
  departureTime: z.string().optional(),         // 현지 출발 시각. 예: 09:30
  arrivalTime: z.string().optional(),           // 현지 도착 시각. 예: 15:05
  direction: z.enum(['outbound', 'return', 'transfer']).optional(),
  lookupUrl: z.string().optional(),             // 직접 지정한 조회 링크가 있으면 우선 사용
  note: z.string().optional(),
});

// 비용 기록 스키마
const expenseCategorySchema = z.enum([
  'flight', 'ferry', 'train', 'bus', 'taxi', 'airport-transfer',
  'hotel', 'food', 'activity', 'shopping', 'insurance', 'etc',
]);

const expenseItemSchema = z.object({
  name: z.string(),
  amount: z.number().optional(),
  currency: z.string().optional(),
  quantity: z.number().optional(),
  note: z.string().optional(),
});

const expenseSchema = z.object({
  title: z.string(),                         // 예: VIE Bangkok, KE629, 팀호완
  category: expenseCategorySchema,
  date: z.string().optional(),
  amount: z.number().optional(),             // 현지 통화 기준 총액
  currency: z.string().optional(),           // 예: KRW, JPY, THB, SGD
  krwAmount: z.number().optional(),          // 원화 환산액을 별도로 기록하고 싶을 때
  quantity: z.number().optional(),           // 예: 2
  unit: z.string().optional(),               // 예: 박, 명, 회, 구간
  payment: z.string().optional(),            // 예: 현대카드, 현금, 친구 정산
  bookingSource: z.string().optional(),      // 예: Accor, Agoda, 항공사 공홈
  linkedLocation: z.string().optional(),     // 장소명과 연결하고 싶을 때
  relatedFlightNo: z.string().optional(),    // 항공편과 연결하고 싶을 때
  items: z.array(expenseItemSchema).optional(), // 식당 메뉴 등 세부 항목
  note: z.string().optional(),
});

// 단일 위치 스키마
const locationSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
  type: locationTypeSchema,
  order: z.number().optional(),
  note: z.string().optional(),
  link: z.string().optional(),           // 외부 링크 (Google Maps 등)
  visitDate: z.string().optional(),      // 방문 날짜
  contents: z.array(contentSectionSchema).optional(),
  images: z.array(z.object({
    src: z.string(),
    alt: z.string().optional(),
    caption: z.string().optional(),
  })).optional(),
  country: z.string().optional(), // 특정 국가에 속한 장소일 경우 (필터링용)
});

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),  // 여행 종료일
    locations: z.array(locationSchema),
    // 새로운 필드들
    country: z.string(),                          // 나라 (필수)
    countries: z.array(z.string()).optional(),    // 여러 나라 경유 시
    flights: z.array(flightSchema).optional(),     // 항공편 기록
    expenses: z.array(expenseSchema).optional(),   // 교통/숙소/식비 등 비용 기록
    tripType: z.array(tripTypeSchema).optional(), // 여행 유형 (복수 가능)
    tags: z.array(z.string()).optional(),
    thumbnail: z.string().optional(),
    excerpt: z.string().optional(),
    draft: z.boolean().optional(), // 숨김 처리 여부 (true면 프로덕션 빌드에서 제외)
  }),
});

export const collections = {
  posts: postsCollection,
};
