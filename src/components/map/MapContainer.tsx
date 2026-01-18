import { useEffect, useState, useRef } from 'react';
import type { Location } from './providers/types';
import { locationTypeIcons, specialTypes } from './providers/types';
import 'leaflet/dist/leaflet.css';
import './MapContainer.css';

interface Route {
  locations: Location[];
  color?: string;
  slug?: string;
}

interface MapContainerProps {
  locations: Location[];
  routes?: Route[];
  showRoute?: boolean;
  worldView?: boolean;  // 전세계 뷰 모드
  className?: string;
}

const routeColors = [
  '#4361ee', '#f72585', '#4cc9f0', '#7b2cbf',
  '#06d6a0', '#ff9f1c', '#ef476f', '#118ab2',
];

export function MapContainer({ 
  locations, 
  routes,
  showRoute = false,
  worldView = false,
  className = '' 
}: MapContainerProps) {
  const [isClient, setIsClient] = useState(false);
  const [MapComponents, setMapComponents] = useState<any>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
    
    Promise.all([
      import('leaflet'),
      import('react-leaflet')
    ]).then(([L, RL]) => {
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
      
      setMapComponents({ L, RL });
    });
  }, []);

  // 마커에 맞게 지도 뷰 조정
  useEffect(() => {
    if (!mapRef.current || !MapComponents) return;
    
    const allLocations = routes 
      ? routes.flatMap(r => r.locations)
      : locations;
    
    if (allLocations.length > 0) {
      const { L } = MapComponents;
      const bounds = L.latLngBounds(allLocations.map((loc: Location) => [loc.lat, loc.lng]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: worldView ? 4 : 10 });
    }
  }, [MapComponents, routes, locations, worldView]);

  if (!isClient || !MapComponents) {
    return (
      <div className={`map-container map-loading ${className}`}>
        <div className="map-placeholder">
          🗺️ 지도 로딩 중...
        </div>
      </div>
    );
  }

  const { L, RL } = MapComponents;
  const { MapContainer: LeafletMap, TileLayer, Marker, Popup, Polyline, useMap } = RL;

  // FitBounds 컴포넌트
  function FitBoundsComponent() {
    const map = useMap();
    
    useEffect(() => {
      mapRef.current = map;
      
      const allLocs = routes 
        ? routes.flatMap(r => r.locations)
        : locations;
      
      if (allLocs.length > 0) {
        const bounds = L.latLngBounds(allLocs.map((loc: Location) => [loc.lat, loc.lng]));
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: worldView ? 4 : 10 });
      }
    }, [map]);
    
    return null;
  }

  const allLocations = routes 
    ? routes.flatMap(r => r.locations)
    : locations;

  // 기본 center (마커 없을 때)
  const defaultCenter: [number, number] = [20, 0]; // 세계 중심
  const defaultZoom = worldView ? 2 : 4;

  const sortedLocations = [...locations].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const polylinePositions = sortedLocations.map(loc => [loc.lat, loc.lng] as [number, number]);

  const getTypeIcon = (type?: string) => locationTypeIcons[type || 'attraction'] || '📍';

  const createTypedIcon = (location: Location, index: number, routeColor?: string) => {
    const icon = getTypeIcon(location.type);
    const num = location.order ?? index + 1;
    const isSpecial = location.type && specialTypes.includes(location.type);
    const bgColor = routeColor || (isSpecial ? '#f59e0b' : '#4361ee');
    
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="marker-icon" style="background: linear-gradient(135deg, ${bgColor}, ${bgColor}dd)">
          <span class="marker-emoji">${icon}</span>
          <span class="marker-num">${num}</span>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });
  };

  return (
    <LeafletMap 
      center={defaultCenter} 
      zoom={defaultZoom} 
      className={`map-container ${className}`}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
      minZoom={2}
      maxZoom={18}
      worldCopyJump={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <FitBoundsComponent />
      
      {/* 여러 루트 라인 */}
      {routes && routes.map((route, routeIndex) => {
        const color = route.color || routeColors[routeIndex % routeColors.length];
        const sortedRouteLocations = [...route.locations].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        const positions = sortedRouteLocations.map(loc => [loc.lat, loc.lng] as [number, number]);
        
        return (
          <Polyline 
            key={`route-${routeIndex}`}
            positions={positions} 
            pathOptions={{ color, weight: 3, opacity: 0.8 }} 
          />
        );
      })}

      {/* 단일 루트 */}
      {showRoute && !routes && polylinePositions.length > 1 && (
        <Polyline 
          positions={polylinePositions} 
          pathOptions={{ color: '#4361ee', weight: 3, opacity: 0.8 }} 
        />
      )}
      
      {/* 여러 루트 마커 */}
      {routes && routes.map((route, routeIndex) => {
        const color = route.color || routeColors[routeIndex % routeColors.length];
        return route.locations.map((location, index) => (
          <Marker 
            key={`${routeIndex}-${location.lat}-${location.lng}-${index}`}
            position={[location.lat, location.lng]}
            icon={createTypedIcon(location, index, color)}
          >
            <Popup>
              <div className="marker-popup">
                <div className="popup-type">{getTypeIcon(location.type)}</div>
                <div className="popup-order" style={{ background: color }}>{location.order ?? index + 1}</div>
                <strong>{location.name}</strong>
                {location.note && <p className="popup-note">{location.note}</p>}
                {location.slug && (
                  <a href={`/posts/${location.slug}/`}>자세히 보기 →</a>
                )}
              </div>
            </Popup>
          </Marker>
        ));
      })}

      {/* 단일 루트 마커 */}
      {!routes && locations.map((location, index) => (
        <Marker 
          key={`${location.lat}-${location.lng}-${index}`}
          position={[location.lat, location.lng]}
          icon={createTypedIcon(location, index)}
        >
          <Popup>
            <div className="marker-popup">
              <div className="popup-type">{getTypeIcon(location.type)}</div>
              <div className="popup-order">{location.order ?? index + 1}</div>
              <strong>{location.name}</strong>
              {location.note && <p className="popup-note">{location.note}</p>}
              {location.excerpt && <p>{location.excerpt}</p>}
              {location.slug && (
                <a href={`/posts/${location.slug}/`}>자세히 보기 →</a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </LeafletMap>
  );
}
