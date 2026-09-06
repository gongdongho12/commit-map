import assert from 'node:assert/strict';
import test from 'node:test';
import { getTripMapLocations } from '../src/lib/tripMapLocations.ts';

const outbound = { name: '김포국제공항', type: 'airport', order: 1 };
const destination = { name: '가오슝국제공항', type: 'airport', order: 2 };
const hotel = { name: 'URBAN HOTEL33', type: 'hotel', order: 3 };
const inbound = { name: '인천국제공항 도착', type: 'airport', order: 4 };

test('maps omit ordinary home endpoints while preserving destination airports and source records', () => {
  const locations = [outbound, destination, hotel, inbound];
  assert.deepEqual(getTripMapLocations(locations, { country: '대만' }), [destination, hotel]);
  assert.equal(locations.length, 4);
  assert.deepEqual(getTripMapLocations([hotel, inbound, outbound, destination], { country: '대만' }), [hotel, destination]);
});

test('keeps home airports used as connections or Korean destinations', () => {
  const connectionStop = { ...inbound, note: '인천 경유 후 연결편 탑승' };
  assert.deepEqual(getTripMapLocations([destination, connectionStop], { country: '대만' }), [destination, connectionStop]);
  assert.deepEqual(getTripMapLocations([destination, inbound, { ...hotel, order: 5 }], { country: '대만' }), [destination, inbound, { ...hotel, order: 5 }]);
  const locations = [outbound, destination, inbound];
  assert.deepEqual(getTripMapLocations(locations, { country: '한국' }), locations);
  assert.deepEqual(getTripMapLocations(locations, { country: '대만', countries: ['대만', '한국'] }), locations);
  assert.deepEqual(getTripMapLocations(locations, {
    country: '대만', flights: [{ direction: 'transfer', from: 'ICN', to: 'KHH' }],
  }), locations);
});

test('handles empty routes and retains local non-airport places named Incheon', () => {
  assert.deepEqual(getTripMapLocations([], { country: '일본' }), []);
  const locations = [{ name: 'Incheon restaurant', type: 'restaurant' }, destination];
  assert.deepEqual(getTripMapLocations(locations, { country: '대만' }), locations);
});
