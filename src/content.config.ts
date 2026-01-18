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
  'beach', 'mountain', 'viewpoint', 'bar', 'palace', 'spa', 'gym',
]).optional();

// 장소별 콘텐츠 섹션
const contentSectionSchema = z.object({
  heading: z.string().optional(),
  text: z.string(),
});

// 단일 위치 스키마
const locationSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
  type: locationTypeSchema,
  order: z.number().optional(),
  note: z.string().optional(),
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
    locations: z.array(locationSchema),
    // 새로운 필드들
    country: z.string(),                          // 나라 (필수)
    countries: z.array(z.string()).optional(),    // 여러 나라 경유 시
    tripType: z.array(tripTypeSchema).optional(), // 여행 유형 (복수 가능)
    tags: z.array(z.string()).optional(),
    thumbnail: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
