type FlightRecord = {
  flightNo: string;
  date?: string;
  airline?: string;
  from?: string;
  to?: string;
  departureTime?: string;
  arrivalTime?: string;
  direction?: 'outbound' | 'return' | 'transfer';
  lookupUrl?: string;
  note?: string;
};

type FlightSchedule = {
  flightNo: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  validFrom?: string;
  validTo?: string;
};

const flightSchedules: FlightSchedule[] = [
  {
    flightNo: 'LJ239',
    airline: '진에어',
    from: 'ICN',
    to: 'KIX',
    departureTime: '16:10',
    arrivalTime: '18:05',
    validFrom: '2026-06-03',
    validTo: '2026-06-03',
  },
  {
    flightNo: 'LJ242',
    airline: '진에어',
    from: 'KIX',
    to: 'ICN',
    departureTime: '11:10',
    arrivalTime: '13:00',
    validFrom: '2026-06-07',
    validTo: '2026-06-07',
  },
];

const normalizeFlightNo = (flightNo: string) => flightNo.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
const normalizeCode = (code?: string) => code?.trim().toUpperCase();

const findSchedule = (flight: FlightRecord) => {
  const normalizedFlightNo = normalizeFlightNo(flight.flightNo);
  const candidates = flightSchedules.filter(schedule => (
    normalizeFlightNo(schedule.flightNo) === normalizedFlightNo
  ));

  const from = normalizeCode(flight.from);
  const to = normalizeCode(flight.to);

  const routeMatched = candidates.filter(schedule => (
    (!from || normalizeCode(schedule.from) === from)
    && (!to || normalizeCode(schedule.to) === to)
  ));
  const scopedCandidates = routeMatched.length > 0 ? routeMatched : candidates;

  return scopedCandidates.find(schedule => (
    (!schedule.validFrom || !flight.date || schedule.validFrom <= flight.date)
    && (!schedule.validTo || !flight.date || flight.date <= schedule.validTo)
  )) || scopedCandidates[0];
};

export const resolveFlightSchedule = <T extends FlightRecord>(flight: T) => {
  const schedule = findSchedule(flight);
  if (!schedule) return flight;

  return {
    ...flight,
    airline: flight.airline ?? schedule.airline,
    from: flight.from ?? schedule.from,
    to: flight.to ?? schedule.to,
    departureTime: flight.departureTime ?? schedule.departureTime,
    arrivalTime: flight.arrivalTime ?? schedule.arrivalTime,
  };
};
