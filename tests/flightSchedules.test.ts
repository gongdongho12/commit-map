import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveFlightSchedule } from '../src/lib/flightSchedules.ts';

test('resolves a matching route on both validity boundaries', () => {
  for (const date of ['2026-03-29', '2026-10-23']) {
    const flight = resolveFlightSchedule({ flightNo: 'ke 2185', date, from: 'icn', to: 'okj' });
    assert.ok('departureTime' in flight && 'arrivalTime' in flight);
    assert.equal(flight.departureTime, '07:30');
    assert.equal(flight.arrivalTime, '09:00');
  }
});

test('does not guess times outside the validity window or without a date', () => {
  for (const date of ['2026-03-28', '2026-10-24', undefined]) {
    const flight = { flightNo: 'KE2185', date };
    assert.deepEqual(resolveFlightSchedule(flight), flight);
  }
});

test('does not use a schedule for a conflicting route', () => {
  const flight = { flightNo: 'KE2185', date: '2026-05-01', from: 'GMP', to: 'KHH' };
  assert.deepEqual(resolveFlightSchedule(flight), flight);
});

test('preserves explicitly recorded times', () => {
  const flight = resolveFlightSchedule({
    flightNo: 'KE2185', date: '2026-05-01', departureTime: '08:00', arrivalTime: '09:30',
  });
  assert.equal(flight.departureTime, '08:00');
  assert.equal(flight.arrivalTime, '09:30');
});

test('leaves an unknown flight unchanged', () => {
  const flight = { flightNo: 'BR172', date: '2026-09-27' };
  assert.deepEqual(resolveFlightSchedule(flight), flight);
});
