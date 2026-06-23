# Commit Map Feature Backlog

Use these as independent PR candidates. Keep one task per PR unless the coordinator says otherwise.

## 1. Travel Stats Summary

Goal: Add a compact stats section to the home page.

Suggested scope:
- `src/pages/index.astro`

Ideas:
- Total trips, countries, locations, and travel days.
- Current year trip count.
- Most visited country.
- Keep it compact above the map or between filters and map.

Validation:
- `npm run build`
- Check mobile layout does not overflow.

## 2. Country Archive Pages

Goal: Add country-specific collection pages.

Suggested scope:
- `src/pages/countries/[country].astro`
- Optional small link enhancement in `src/pages/index.astro`

Ideas:
- `/countries/japan/` style pages using encoded route params.
- Show trip cards for that country and a small country summary.
- Preserve multi-country posts through `countries` and hyphen-split country fields.

Validation:
- `npm run build`
- Confirm generated routes include at least Japan, Thailand, Macau, Singapore, Indonesia.

## 3. Place-Type Filters

Goal: Let users filter visible places by type on map-heavy views.

Suggested scope:
- `src/components/map/MapContainer.tsx`
- `src/components/map/MapContainer.css`
- Optional type definitions in `src/components/map/providers/types.ts`

Ideas:
- Toggle chips for hotel, airport, restaurant, attraction, nature, shopping.
- Apply filtering to markers without mutating route data.
- Keep route lines readable after filters.

Validation:
- `npm run build`
- Test at least all/one/multiple type selections.

## 4. Post Detail Route Animation

Goal: Add a lightweight route playback control on post detail maps.

Suggested scope:
- `src/components/map/MapContainer.tsx`
- `src/components/map/MapContainer.css`
- Optional small prop wiring from `src/pages/posts/[slug].astro`

Ideas:
- Button to step through locations in order.
- Highlight the active marker and fit or pan map as the route progresses.
- Respect current static route rendering when playback is inactive.

Validation:
- `npm run build`
- Verify a post with many locations and a post with few locations.

## 5. Search

Goal: Add client-side search for trips.

Suggested scope:
- `src/pages/index.astro`

Ideas:
- Search title, country, tags, excerpt, and location names.
- Combine with existing country filters.
- Reset visible recent count when search changes.

Validation:
- `npm run build`
- Test empty search, no result, and combined country filter.

## 6. Trip Retrospective Fields

Goal: Add optional retrospective fields to posts.

Suggested scope:
- `src/content.config.ts`
- `src/pages/posts/[slug].astro`
- Maybe one sample post

Ideas:
- `highlights`, `lessons`, `nextTime`, or similar fields.
- Render only when present.
- Keep schema backwards-compatible.

Validation:
- `npm run build`
