import type { CollectionEntry } from 'astro:content';

type PostData = CollectionEntry<'posts'>['data'];
type TranslationData = CollectionEntry<'postTranslations'>['data'];

function requireTextFields(source: object, translated: object, fields: string[], context: string) {
  for (const field of fields) {
    if (typeof (source as Record<string, unknown>)[field] === 'string'
      && typeof (translated as Record<string, unknown>)[field] !== 'string') {
      throw new Error(`Missing English ${field}: ${context}`);
    }
  }
}

// Repeated names (e.g. the same airport on arrival and departure) use "name#2", "name#3" for later occurrences.
export function occurrenceKeys(names: string[]) {
  const seen = new Map<string, number>();
  return names.map(name => {
    const count = (seen.get(name) || 0) + 1;
    seen.set(name, count);
    return count === 1 ? name : `${name}#${count}`;
  });
}

function requireMatchingKeys(keys: string[], translated: Record<string, unknown>, context: string) {
  const expected = new Set(keys);
  if (expected.size !== keys.length) throw new Error(`Duplicate translation key: ${context}`);
  if (Object.keys(translated).length !== expected.size || [...expected].some(key => !(key in translated))) {
    throw new Error(`English translation keys do not match the original: ${context}`);
  }
}

// Translate text only. Dates, prices, coordinates, links and record order come from the original.
export function localizePostData(source: PostData, translation: TranslationData): PostData {
  const locationKeys = occurrenceKeys(source.locations.map(item => item.name));
  requireMatchingKeys(locationKeys, translation.locations, translation.postSlug);
  requireMatchingKeys((source.flights || []).map(item => item.flightNo), translation.flights, `${translation.postSlug} flights`);
  requireMatchingKeys((source.expenses || []).map(item => item.title), translation.expenses, `${translation.postSlug} expenses`);

  return {
    ...source,
    title: translation.title,
    titleEn: translation.title,
    excerpt: translation.excerpt,
    country: translation.country,
    countries: source.countries?.map(country => {
      const translated = country === source.country ? translation.country : translation.countries?.[country];
      if (!translated) throw new Error(`English country translation required: ${country}`);
      return translated;
    }),
    tags: translation.tags,
    locations: source.locations.map((location, locationIndex) => {
      const localized = translation.locations[locationKeys[locationIndex]];
      requireTextFields(location, localized, ['name', 'note', 'country'], location.name);
      if (location.contents?.length !== localized.contents?.length) {
        throw new Error(`English location content does not match: ${location.name}`);
      }
      location.contents?.forEach((content, index) => {
        requireTextFields(content, localized.contents![index], ['heading', 'text'], location.name);
      });
      if (location.images?.length !== localized.images?.length) {
        throw new Error(`English image descriptions do not match: ${location.name}`);
      }
      return {
        ...location,
        ...localized,
        images: location.images?.map((image, index) => {
          const text = localized.images![index];
          requireTextFields(image, text, ['alt', 'caption'], location.name);
          return { ...image, ...text };
        }),
      };
    }),
    flights: source.flights?.map(flight => {
      const localized = translation.flights[flight.flightNo];
      requireTextFields(flight, localized, ['note', 'airline'], flight.flightNo);
      return { ...flight, ...localized };
    }),
    expenses: source.expenses?.map(expense => {
      const localized = translation.expenses[expense.title];
      requireTextFields(expense, localized, ['title', 'note', 'unit', 'payment', 'bookingSource', 'linkedLocation'], expense.title);
      if (expense.items?.length !== localized.items?.length) {
        throw new Error(`English expense items do not match: ${expense.title}`);
      }
      return {
        ...expense,
        ...localized,
        items: expense.items?.map((item, index) => {
          const text = localized.items![index];
          requireTextFields(item, text, ['name', 'note'], expense.title);
          return { ...item, ...text };
        }),
      };
    }),
  };
}
