import type { CollectionEntry } from 'astro:content';
import { resolveFlightSchedule } from './flightSchedules';

type PostEntry = CollectionEntry<'posts'>;

type ClipExpenseCategory = 'transport' | 'hotel' | 'food' | 'activity' | 'shopping' | 'etc';
type TransportMode = 'flight' | 'train' | 'bus' | 'ferry' | 'car';

type RoutePoint = {
  city: string;
  country: string;
  code: string;
  lat: number;
  lng: number;
  emoji?: string;
  terminal?: string;
};

type RouteSegment = {
  id: string;
  mode: TransportMode;
  from: RoutePoint;
  to: RoutePoint;
  operator?: string;
  vehicleCode?: string;
  departureTime?: string;
  arrivalTime?: string;
  price?: number;
  currency?: string;
  note?: string;
};

const airportPoints: Record<string, RoutePoint> = {
  ICN: { city: '인천', country: '한국', code: 'ICN', lat: 37.4602, lng: 126.4407, emoji: '✈️' },
  KIX: { city: '오사카', country: '일본', code: 'KIX', lat: 34.4320, lng: 135.2304, emoji: '✈️' },
  OKJ: { city: '오카야마', country: '일본', code: 'OKJ', lat: 34.7569, lng: 133.8553, emoji: '✈️' },
  TAK: { city: '다카마쓰', country: '일본', code: 'TAK', lat: 34.2142, lng: 134.0156, emoji: '✈️' },
  NGO: { city: '나고야', country: '일본', code: 'NGO', lat: 34.8584, lng: 136.8124, emoji: '✈️' },
  MNL: { city: '마닐라', country: '필리핀', code: 'MNL', lat: 14.5086, lng: 121.0194, emoji: '✈️' },
  BKK: { city: '방콕', country: '태국', code: 'BKK', lat: 13.6900, lng: 100.7501, emoji: '✈️' },
  SIN: { city: '싱가포르', country: '싱가포르', code: 'SIN', lat: 1.3644, lng: 103.9915, emoji: '✈️' },
  DPS: { city: '발리', country: '인도네시아', code: 'DPS', lat: -8.7467, lng: 115.1672, emoji: '✈️' },
  MFM: { city: '마카오', country: '마카오', code: 'MFM', lat: 22.1496, lng: 113.5916, emoji: '✈️' },
};

const airlineCodeLabels: Record<string, { airline: string; color: string }> = {
  '5J': { airline: '세부퍼시픽', color: '#facc15' },
  '7C': { airline: '제주항공', color: '#f97316' },
  KE: { airline: '대한항공', color: '#2563eb' },
  LJ: { airline: '진에어', color: '#16a34a' },
  NX: { airline: '에어마카오', color: '#0f766e' },
};

const toYmd = (date: Date) => date.toISOString().slice(0, 10);

const normalizeFlightNo = (flightNo: string) => flightNo.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

const getFlightPrefix = (flightNo: string) => normalizeFlightNo(flightNo).match(/^([A-Z0-9]{2})/)?.[1] || '';

const slugFromPost = (post: PostEntry) => post.id.replace(/\.md$/, '');

const clipCategoryFromExpense = (category: string): ClipExpenseCategory => {
  if (['flight', 'ferry', 'train', 'bus', 'taxi', 'airport-transfer'].includes(category)) return 'transport';
  if (['hotel', 'food', 'activity', 'shopping'].includes(category)) return category as ClipExpenseCategory;
  return 'etc';
};

const transportModeFromExpense = (category?: string): TransportMode => {
  if (category === 'ferry') return 'ferry';
  if (category === 'train') return 'train';
  if (category === 'bus') return 'bus';
  if (category === 'taxi' || category === 'airport-transfer') return 'car';
  return 'flight';
};

const activityTypeFromLocation = (type?: string) => {
  if (type === 'hotel') return 'hotel';
  if (['restaurant', 'cafe', 'bar'].includes(type || '')) return 'food';
  if (['airport', 'transport'].includes(type || '')) return 'travel';
  if (['spa', 'theater', 'museum', 'market', 'shopping'].includes(type || '')) return 'activity';
  return 'sightseeing';
};

const isHomeAirportDeparture = (
  location: PostEntry['data']['locations'][number],
  index: number,
) => (
  index === 0
  && location.country === '한국'
  && location.type === 'airport'
  && /인천|김포|공항/.test(location.name)
);

const dateFromVisitDate = (visitDate: string | undefined, fallback: Date) => {
  if (!visitDate) return toYmd(fallback);

  const firstDate = visitDate.split('-')[0]?.trim();
  const match = firstDate.match(/^(\d{1,2})\/(\d{1,2})$/);
  if (!match) return toYmd(fallback);

  const [, month, day] = match;
  return `${fallback.getFullYear()}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const findFlightExpense = (
  expenses: PostEntry['data']['expenses'] | undefined,
  flightNo: string,
) => expenses?.find(expense => (
  expense.category === 'flight'
  && expense.relatedFlightNo?.split('/').some(item => normalizeFlightNo(item) === normalizeFlightNo(flightNo))
));

const pointFromAirportCode = (code?: string): RoutePoint | undefined => {
  if (!code) return undefined;
  const normalizedCode = code.toUpperCase();
  return airportPoints[normalizedCode] || {
    city: normalizedCode,
    country: '',
    code: normalizedCode,
    lat: 0,
    lng: 0,
    emoji: '✈️',
  };
};

const buildRouteSegments = (post: PostEntry): RouteSegment[] => {
  const flights = (post.data.flights || []).map(resolveFlightSchedule);

  return flights
    .map((flight, index) => {
      const from = pointFromAirportCode(flight.from);
      const to = pointFromAirportCode(flight.to);
      if (!from || !to) return undefined;

      const expense = findFlightExpense(post.data.expenses, flight.flightNo);
      return {
        id: `flight-${normalizeFlightNo(flight.flightNo).toLowerCase()}-${index + 1}`,
        mode: 'flight' as const,
        from,
        to,
        operator: flight.airline,
        vehicleCode: flight.flightNo,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        ...(expense?.amount ? { price: expense.amount, currency: expense.currency || 'KRW' } : {}),
        note: flight.note,
      };
    })
    .filter((segment): segment is RouteSegment => Boolean(segment));
};

const buildTripSummary = (post: PostEntry, tripExpenses: ReturnType<typeof buildTripExpenses>) => {
  const krwTotal = tripExpenses.reduce((sum, expense) => (
    expense.currency === 'KRW' ? sum + expense.amount : sum
  ), 0);

  return {
    title: post.data.title,
    startDate: toYmd(post.data.date),
    endDate: toYmd(post.data.endDate || post.data.date),
    destinations: post.data.countries || [post.data.country],
    budget: krwTotal,
    actualSpent: krwTotal,
    currency: 'KRW',
    travelerCount: 1,
  };
};

function buildTripExpenses(post: PostEntry) {
  return (post.data.expenses || [])
    .filter(expense => expense.amount !== undefined || expense.krwAmount !== undefined)
    .map((expense, index) => ({
      id: `expense-${index + 1}`,
      category: clipCategoryFromExpense(expense.category),
      label: expense.title,
      amount: expense.amount ?? expense.krwAmount ?? 0,
      currency: expense.currency || (expense.krwAmount !== undefined ? 'KRW' : 'KRW'),
      note: [
        expense.quantity && expense.unit ? `${expense.quantity}${expense.unit}` : undefined,
        expense.bookingSource,
        expense.note,
      ].filter(Boolean).join(' · ') || undefined,
    }));
}

const buildFlights = (post: PostEntry) => {
  const flights = (post.data.flights || []).map(resolveFlightSchedule);

  return flights
    .map((flight) => {
      const from = pointFromAirportCode(flight.from);
      const to = pointFromAirportCode(flight.to);
      if (!from || !to) return undefined;

      const expense = findFlightExpense(post.data.expenses, flight.flightNo);
      const airlineCode = getFlightPrefix(flight.flightNo);
      const airlineMeta = airlineCodeLabels[airlineCode];

      return {
        airline: flight.airline || airlineMeta?.airline || airlineCode || '항공편',
        airlineCode,
        logoColor: airlineMeta?.color || '#38bdf8',
        departure: {
          city: from.city,
          airport: from.code,
          time: flight.departureTime || '',
          date: flight.date || toYmd(post.data.date),
        },
        arrival: {
          city: to.city,
          airport: to.code,
          time: flight.arrivalTime || '',
          date: flight.date || toYmd(post.data.date),
        },
        duration: '',
        stops: 0,
        price: expense?.amount || expense?.krwAmount || 0,
        currency: expense?.currency || (expense?.krwAmount ? 'KRW' : 'KRW'),
        class: 'economy' as const,
      };
    })
    .filter((flight): flight is NonNullable<typeof flight> => Boolean(flight));
};

const buildHotels = (post: PostEntry) => {
  return post.data.locations
    .filter(location => location.type === 'hotel')
    .map((location) => {
      const expense = post.data.expenses?.find(item => (
        item.category === 'hotel'
        && (item.linkedLocation === location.name || location.name.includes(item.title) || item.title.includes(location.name))
      ));
      const nights = expense?.quantity || 1;

      return {
        name: location.name,
        location: location.country || post.data.country,
        stars: 4,
        pricePerNight: Math.round((expense?.amount || expense?.krwAmount || 0) / nights),
        currency: expense?.currency || (expense?.krwAmount ? 'KRW' : 'KRW'),
        amenities: ['숙박', '여행 거점'],
        rating: 4.5,
        reviewCount: 0,
      };
    });
};

const buildItinerary = (post: PostEntry) => {
  const videoLocations = post.data.locations
    .filter((location, index) => !isHomeAirportDeparture(location, index))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const grouped = videoLocations.reduce((groups, location) => {
    const date = dateFromVisitDate(location.visitDate, post.data.date);
    const current = groups.get(date) || [];
    current.push(location);
    groups.set(date, current);
    return groups;
  }, new Map<string, typeof videoLocations>());

  return Array.from(grouped.entries()).map(([date, locations], dayIndex) => {
    const first = locations[0];

    return {
      day: dayIndex + 1,
      date,
      title: `${dayIndex + 1}일차`,
      location: first?.country || post.data.country,
      emoji: '📍',
      activities: locations.map((location, index) => ({
        time: `${String(9 + Math.min(index, 10)).padStart(2, '0')}:00`,
        title: location.name,
        description: location.note || location.contents?.[0]?.text || '',
        type: activityTypeFromLocation(location.type),
      })),
    };
  });
};

const buildFoods = (post: PostEntry) => {
  return (post.data.expenses || [])
    .filter(expense => expense.category === 'food')
    .flatMap((expense) => {
      if (expense.items && expense.items.length > 0) {
        return expense.items.map(item => ({
          restaurantName: expense.title,
          location: expense.linkedLocation || post.data.country,
          dish: item.name,
          price: item.amount || 0,
          currency: item.currency || expense.currency || 'KRW',
        }));
      }

      return [{
        restaurantName: expense.title,
        location: expense.linkedLocation || post.data.country,
        dish: expense.title,
        price: expense.amount || expense.krwAmount || 0,
        currency: expense.currency || (expense.krwAmount ? 'KRW' : 'KRW'),
      }];
    });
};

const buildPhotos = (post: PostEntry) => {
  return post.data.locations
    .flatMap(location => (
      (location.images || []).map(image => ({
        imageUrl: image.src,
        caption: image.caption || image.alt || location.name,
        location: location.name,
      }))
    ));
};

export const buildClipPayload = (post: PostEntry) => {
  const slug = slugFromPost(post);
  const tripExpenses = buildTripExpenses(post);
  const tripSummary = buildTripSummary(post, tripExpenses);
  const routeSegments = buildRouteSegments(post);
  const flights = buildFlights(post);
  const hotels = buildHotels(post);
  const itinerary = buildItinerary(post);
  const foods = buildFoods(post);
  const photos = buildPhotos(post);

  return {
    version: 1,
    source: 'commit-map',
    slug,
    viewMode: 'video',
    activeClip: 'GlobeRoute',
    themeId: 'dark-blue',
    resTag: 'HD',
    tripSummary,
    tripExpenses,
    routeSegments,
    activeRouteSegmentId: routeSegments[0]?.id || '',
    clips: {
      GlobeRoute: {
        settings: {
          title: `${post.data.title} 이동 경로`,
          durationInFrames: 720,
          fps: 60,
        },
      },
      TransportReveal: {},
      TripCostSlide: {
        data: {
          trip: tripSummary,
          expenses: tripExpenses,
        },
      },
      AirlineSlide: {
        data: flights,
      },
      HotelPriceSlide: {
        data: hotels,
      },
      ItinerarySlide: {
        data: itinerary,
      },
      FoodSlide: {
        data: foods,
      },
      PhotoMontage: {
        data: photos,
      },
    },
  };
};

export const buildClipPayloadPath = (post: PostEntry) => `/clips/${slugFromPost(post)}.json`;
