interface MapStop {
  name: string;
  type?: string;
  order?: number;
  note?: string;
}

interface TripContext {
  country: string;
  countries?: string[];
  flights?: { from?: string; to?: string; direction?: string }[];
}

const homeAirport = /인천.*공항|김포.*공항|\b(?:ICN|GMP|Incheon|Gimpo)\b/i;
const connection = /환승|경유|연계|스톱오버|\b(?:transfer|connection|stopover)\b/i;
const korea = /^(?:한국|대한민국|South Korea|Korea)$/i;

// Keep flight and location records intact; trim ordinary home-airport endpoints only on maps.
export function getTripMapLocations<T extends MapStop>(locations: T[], trip: TripContext): T[] {
  const countries = trip.countries?.length ? trip.countries : [trip.country];
  if (countries.some(country => country.split('-').some(part => korea.test(part.trim())))) {
    return locations;
  }

  const hasHomeConnection = trip.flights?.some(flight => (
    flight.direction === 'transfer'
    && [flight.from, flight.to].some(airport => airport && homeAirport.test(airport))
  ));
  if (hasHomeConnection) return locations;

  const sorted = locations.map((location, index) => ({ location, index }))
    .sort((a, b) => (a.location.order ?? a.index + 1) - (b.location.order ?? b.index + 1));
  const endpointIndexes = new Set([sorted[0]?.index, sorted.at(-1)?.index]);

  return locations.filter((location, index) => !(
    endpointIndexes.has(index)
    && location.type === 'airport'
    && homeAirport.test(location.name)
    && !connection.test(`${location.name} ${location.note ?? ''}`)
  ));
}
