import type { MapProvider } from './types';
import { LeafletProvider } from './leaflet';

export type MapProviderType = 'leaflet' | 'mapbox' | 'google';

const providers: Record<MapProviderType, () => MapProvider> = {
  leaflet: () => new LeafletProvider(),
  mapbox: () => {
    // TODO: Implement MapboxProvider
    console.warn('Mapbox provider not implemented, falling back to Leaflet');
    return new LeafletProvider();
  },
  google: () => {
    // TODO: Implement GoogleMapsProvider
    console.warn('Google Maps provider not implemented, falling back to Leaflet');
    return new LeafletProvider();
  },
};

export function createMapProvider(type: MapProviderType = 'leaflet'): MapProvider {
  const factory = providers[type];
  if (!factory) {
    console.warn(`Unknown map provider: ${type}, falling back to Leaflet`);
    return new LeafletProvider();
  }
  return factory();
}

export * from './types';
