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
    flightNo: 'KE2185',
    airline: '대한항공',
    from: 'ICN',
    to: 'OKJ',
    departureTime: '07:30',
    arrivalTime: '09:00',
    validFrom: '2026-03-29',
    validTo: '2026-10-23',
  },
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
  {
    flightNo: 'LJ360',
    airline: '진에어',
    from: 'TAK',
    to: 'ICN',
    departureTime: '17:15',
    arrivalTime: '18:55',
    validFrom: '2026-03-29',
    validTo: '2026-10-11',
  },
  {
    flightNo: 'LJ359',
    airline: '진에어',
    from: 'ICN',
    to: 'TAK',
    departureTime: '14:30',
    arrivalTime: '16:15',
    validFrom: '2026-10-23',
    validTo: '2026-10-23',
  },
  {
    flightNo: 'LJ237',
    airline: '진에어',
    from: 'ICN',
    to: 'KIX',
    departureTime: '14:40',
    arrivalTime: '16:30',
    validFrom: '2026-07-01',
    validTo: '2026-09-12',
  },
  {
    flightNo: '7C1204',
    airline: '제주항공',
    from: 'NGO',
    to: 'ICN',
    departureTime: '18:00',
    arrivalTime: '20:15',
    validFrom: '2026-03-29',
    validTo: '2026-10-24',
  },
  {
    flightNo: '5J187',
    airline: '세부퍼시픽',
    from: 'ICN',
    to: 'MNL',
    departureTime: '02:15',
    arrivalTime: '05:40',
    validFrom: '2026-03-29',
    validTo: '2027-03-13',
  },
  {
    flightNo: '5J188',
    airline: '세부퍼시픽',
    from: 'MNL',
    to: 'ICN',
    departureTime: '19:35',
    arrivalTime: '00:45(+1)',
    validFrom: '2026-03-29',
    validTo: '2027-03-13',
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
  return routeMatched.find(schedule => (
    (!schedule.validFrom || (flight.date && schedule.validFrom <= flight.date))
    && (!schedule.validTo || (flight.date && flight.date <= schedule.validTo))
  ));
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
