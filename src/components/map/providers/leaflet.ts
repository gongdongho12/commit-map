import L from 'leaflet';
import type { Location, MapProvider, MapProviderOptions } from './types';

// Fix for default marker icons in webpack/vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export class LeafletProvider implements MapProvider {
  readonly name = 'leaflet';
  private map: L.Map | null = null;
  private markers: L.Marker[] = [];
  private polylines: L.Polyline[] = [];
  private onMarkerClick?: (slug: string) => void;

  initialize(container: HTMLElement, options: MapProviderOptions): void {
    const { center = [37.5665, 126.9780], zoom = 5, onMarkerClick } = options;
    
    this.onMarkerClick = onMarkerClick;
    
    this.map = L.map(container).setView(center, zoom);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  addMarkers(locations: Location[]): void {
    if (!this.map) return;

    // Clear existing markers and polylines
    this.markers.forEach(marker => marker.remove());
    this.polylines.forEach(polyline => polyline.remove());
    this.markers = [];
    this.polylines = [];

    locations.forEach((location, index) => {
      // 순서 표시를 위한 커스텀 아이콘
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-number">${location.order ?? index + 1}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([location.lat, location.lng], { icon })
        .addTo(this.map!)
        .bindPopup(`
          <div class="marker-popup">
            <div class="popup-order">${location.order ?? index + 1}</div>
            <strong>${location.name}</strong>
            ${location.note ? `<p class="popup-note">${location.note}</p>` : ''}
            ${location.excerpt ? `<p>${location.excerpt}</p>` : ''}
            ${location.slug ? `<a href="/posts/${location.slug}/">자세히 보기 →</a>` : ''}
          </div>
        `);

      this.markers.push(marker);
    });
  }

  // 경로를 선으로 연결
  addRoute(locations: Location[], color: string = '#4361ee'): void {
    if (!this.map || locations.length < 2) return;

    const sortedLocations = [...locations].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const latlngs: L.LatLngExpression[] = sortedLocations.map(loc => [loc.lat, loc.lng]);

    const polyline = L.polyline(latlngs, {
      color,
      weight: 3,
      opacity: 0.7,
      dashArray: '10, 5',
    }).addTo(this.map);

    this.polylines.push(polyline);
  }

  fitToMarkers(): void {
    if (!this.map || this.markers.length === 0) return;

    const group = L.featureGroup(this.markers);
    this.map.fitBounds(group.getBounds().pad(0.1));
  }

  destroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    this.markers = [];
    this.polylines = [];
  }
}
