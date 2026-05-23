export interface Location {
  lat: number;
  lng: number;
  name: string;
  slug?: string;
  link?: string;  // 외부 링크 (Google Maps 등)
  visitDate?: string;  // 방문 날짜 (예: "2025-10-01" 또는 "10/1")
  order?: number;
  note?: string;
  type?: string;
  date?: Date;
  excerpt?: string;
  country?: string;
}

export interface MarkerClickHandler {
  (slug: string): void;
}

export interface MapProviderOptions {
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: MarkerClickHandler;
}

export interface MapProvider {
  readonly name: string;
  initialize(container: HTMLElement, options: MapProviderOptions): void;
  addMarkers(locations: Location[]): void;
  addRoute?(locations: Location[], color?: string): void;
  fitToMarkers(): void;
  destroy(): void;
}

// 타입별 이모지 매핑
export const locationTypeIcons: Record<string, string> = {
  attraction: '🏛️',
  hotel: '🏨',
  restaurant: '🍽️',
  cafe: '☕',
  transport: '🚉',
  airport: '✈️',
  shopping: '🛍️',
  nature: '🌳',
  temple: '⛩️',
  museum: '🖼️',
  zoo: '🦁',
  theater: '🎭',
  market: '🏪',
  beach: '🏖️',
  mountain: '⛰️',
  viewpoint: '🌅',
  bar: '🍺',
  palace: '🏰',
  spa: '💆',
  gym: '🏋️',
  church: '⛪',
};

// 특별 스타일 적용할 타입 (호텔, 음식 관련)
export const specialTypes = ['hotel', 'restaurant', 'cafe', 'bar'];
