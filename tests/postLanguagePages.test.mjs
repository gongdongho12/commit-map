// Build first: npm run build && node --test tests/postLanguagePages.test.mjs
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const slug = '2026-11-20-nha-trang';
const readPage = (suffix = '') => readFileSync(new URL(`../dist/posts/${slug}/${suffix}index.html`, import.meta.url), 'utf8');
const english = readPage('en/');
const korean = readPage('ko/');
const content = html => html.match(/<section class="post-content"[^>]*>([\s\S]*?)<\/section>/)?.[1] || '';
const section = (html, id) => html.match(new RegExp(`<section[^>]*id="${id}"[^>]*>([\\s\\S]*?)<\\/section>`))?.[1] || '';

test('direct English URL contains English content and metadata before JavaScript runs', () => {
  assert.match(english, /<html lang="en"/);
  assert.match(english, /<title>Nha Trang: Three Flexible Plans/);
  assert.match(content(english), /Plan A/);
  assert.match(content(english), /Plan B/);
  assert.match(content(english), /Plan C/);
  assert.doesNotMatch(content(english), /[가-힣]/);
  assert.match(english, /#Hotel pools/);
  assert.match(section(english, 'trip-flights'), /baggage not included/);
  assert.match(section(english, 'trip-expenses'), /ibis Styles Nha Trang/);
  assert.match(section(english, 'trip-locations'), /Cam Ranh International Airport/);
});

test('language switches are real links and the root consistently renders Korean', () => {
  assert.match(korean, new RegExp(`href="/posts/${slug}/en/"`));
  assert.match(english, new RegExp(`href="/posts/${slug}/ko/"`));
  assert.doesNotMatch(english, /history\.replaceState/);
  const header = english.match(/<header class="header"[^>]*>([\s\S]*?)<\/header>/)?.[1] || '';
  assert.match(header, /language-switcher/);
  assert.match(header, new RegExp(`href="/posts/${slug}/ko/"`));
  assert.doesNotMatch(english, /lang-switch-bar/);
  assert.match(content(readPage()), /일정 요약/);
  assert.match(content(korean), /플랜 A/);
  assert.doesNotMatch(english, /모두 보기 \(Dual\)/);
});

test('costs and recorded flight times agree in both languages', () => {
  for (const html of [korean, english]) {
    assert.match(section(html, 'trip-expenses'), /278,651/);
    for (const amount of ['36,574', '49,517', '192,560']) {
      assert.match(section(html, 'trip-expenses'), new RegExp(amount));
    }
    assert.match(section(html, 'trip-flights'), /RS115/);
    assert.match(section(html, 'trip-flights'), /RS116/);
    assert.match(section(html, 'trip-flights'), /20:00/);
    assert.match(section(html, 'trip-flights'), /00:30/);
  }
});

test('removed cave placeholder stays out of both language pages', () => {
  for (const html of [korean, english]) {
    assert.doesNotMatch(content(html), /민물 동굴 수영은|mocnam\.vn|Hang E/);
  }
});

test('legacy bilingual pages keep English', () => {
  const legacy = readFileSync(new URL('../dist/posts/2026-10-06-seoul-nami-island/en/index.html', import.meta.url), 'utf8');
  assert.match(legacy, /data-initial-lang="en"/);
  assert.match(legacy, /class="lang-en"/);
});

test('every post renders translated content and data sections in English, Japanese and Chinese', () => {
  const slugs = readdirSync(new URL('../src/content/posts/', import.meta.url))
    .filter(name => name.endsWith('.md')).map(name => name.replace(/\.md$/, ''));
  for (const lang of ['en','ja','zh']) {
    for (const postSlug of slugs) {
      if (lang === 'en' && postSlug === '2026-10-06-seoul-nami-island') continue;
      const html = readFileSync(new URL(`../dist/posts/${postSlug}/${lang}/index.html`, import.meta.url), 'utf8');
      assert.doesNotMatch(html, /http-equiv="refresh"/, `${postSlug}/${lang} redirects instead of rendering`);
      assert.match(html, new RegExp(`<html lang="${lang}"`), `${postSlug}/${lang}`);
      const visible = part => part.replace(/<span class="lang-ko"[^>]*>[\s\S]*?<\/span>/g, '');
      for (const part of [content(html), section(html, 'trip-flights'), section(html, 'trip-expenses'), section(html, 'trip-locations')].map(visible)) {
        assert.doesNotMatch(part, /[가-힣]/, `${postSlug}/${lang} still contains untranslated Korean`);
      }
    }
  }
});

const homeKo = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const homeEn = readFileSync(new URL('../dist/en/index.html', import.meta.url), 'utf8');

test('English home renders translated UI, country filters and every visible trip summary', () => {
  assert.match(homeEn, /<html lang="en"/);
  assert.match(homeEn, /Footprints of My Travels/);
  assert.match(homeEn, /Total trips/);
  assert.match(homeEn, /Upcoming trips/);
  assert.match(homeEn, /data-country="Vietnam"/);
  const cards = [...homeEn.matchAll(/<article class="post-card[^\"]*"[^>]*>([\s\S]*?)<\/article>/g)].map(match => match[1]);
  const koCards = [...homeKo.matchAll(/<article class="post-card[^\"]*"[^>]*>([\s\S]*?)<\/article>/g)];
  assert.ok(cards.length > 20);
  assert.equal(cards.length, koCards.length);
  for (const card of cards) assert.doesNotMatch(card, /[가-힣]/);
  assert.match(homeEn, /Nha Trang: Three Flexible Plans/);
  assert.doesNotMatch(homeEn, /href="\/posts\/2026-10-06-seoul-nami-island\//);
  const stats = html => [...html.matchAll(/data-stat-value="(\d+)"/g)].map(match => match[1]);
  assert.deepEqual(stats(homeEn), stats(homeKo));
});

test('home language links and translated article return links use the correct paths', () => {
  assert.match(homeKo, /href="\/en\/"[^>]*class="language-option/);
  assert.match(homeEn, /href="\/\?lang=ko"[^>]*class="language-option/);
  assert.match(homeEn, new RegExp(`href="/posts/${slug}/en/"`));
  assert.match(english, /href="\/en\/" class="back-link"/);
  assert.match(english, /href="\/en\/" class="logo"/);
  assert.match(homeEn, /href="\/posts\/2027-05-13-haiphong-halong-hanoi\/en\/"/);
});

// These tests exercise the inline production redirect without network or browser settings changes.

function chooseDefault(html, { saved = null, languages = ['en-US'], pathname = '/', search = '', hash = '', denied = false } = {}) {
  const script = html.match(/<script[^>]*data-language-preference[^>]*>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, 'Missing production preference script');
  const redirects = [];
  vm.runInNewContext(script, {
    URLSearchParams,
    navigator: { languages },
    localStorage: { getItem() { if (denied) throw new Error('Storage unavailable'); return saved; } },
    window: { location: { pathname, search, hash, replace: target => redirects.push(target) } },
  });
  return redirects[0];
}

test('browser language and region select the first supported locale', () => {
  assert.equal(chooseDefault(homeKo, {languages:['ja-JP']}), '/ja/');
  assert.equal(chooseDefault(homeKo, {languages:['zh-CN']}), '/zh/');
  assert.equal(chooseDefault(homeKo, {languages:['zh-TW']}), '/zh/');
  assert.equal(chooseDefault(homeKo, {languages:['ko-KR']}), undefined);
  assert.equal(chooseDefault(homeKo, {languages:['fr-FR','ja-JP']}), '/ja/');
  assert.equal(chooseDefault(homeKo, {languages:['fr-FR']}), '/en/');
});

test('explicit choice beats saved preference, which beats browser language; no redirect loops', () => {
  assert.equal(chooseDefault(homeKo, {saved:'zh',languages:['ja-JP']}), '/zh/');
  assert.equal(chooseDefault(homeKo, {saved:'ko',languages:['ja-JP']}), undefined);
  assert.equal(chooseDefault(homeKo, {saved:'ja',search:'?lang=ko',languages:['zh-CN']}), undefined);
  assert.equal(chooseDefault(homeKo, {saved:'invalid',languages:['ja-JP']}), '/ja/');
  assert.equal(chooseDefault(homeKo, {denied:true,languages:['ja-JP']}), '/ja/');
  assert.equal(chooseDefault(homeKo, {saved:'ja',pathname:'/en/'}), undefined);
  assert.equal(chooseDefault(homeKo, {languages:['ja-JP'],search:'?ref=share',hash:'#plans-section'}), '/ja/?ref=share#plans-section');
  assert.equal(chooseDefault(readPage(), {saved:'ja',pathname:`/posts/${slug}/`}), `/posts/${slug}/ja/`);
});

test('Japanese and Chinese home and article pages use real translations and preserve shared costs', () => {
  const stats = html => [...html.matchAll(/data-stat-value="(\d+)"/g)].map(match => match[1]);
  for (const lang of ['ja','zh']) {
    const home = readFileSync(new URL(`../dist/${lang}/index.html`, import.meta.url), 'utf8');
    const article = readPage(`${lang}/`);
    assert.match(home, new RegExp(`<html lang="${lang}"`));
    assert.match(article, new RegExp(`<html lang="${lang}"`));
    assert.match(home, new RegExp(`href="/posts/${slug}/${lang}/"`));
    assert.match(article, new RegExp(`href="/${lang}/" class="back-link"`));
    assert.match(content(article), lang === 'ja' ? /プラン/ : /方案/);
    assert.match(section(article,'trip-expenses'), /278,651/);
    assert.deepEqual(stats(home), stats(homeKo));
    for (const code of ['ko','en','ja','zh']) {
      assert.match(article, new RegExp(`data-language-choice="${code}"`));
      assert.match(home, new RegExp(`data-language-choice="${code}"`));
    }
    // Collapsed switcher: the current language is the active (first) option; native names stay available as titles
    const switcher = (home.match(/<nav class="language-switcher"[\s\S]*?<\/nav>/) || [''])[0];
    assert.match(switcher, new RegExp(`class="language-option active"[^>]*data-language-choice="${lang}"`));
    assert.ok(switcher.indexOf(`data-language-choice="${lang}"`) < switcher.indexOf('data-language-choice="ko"'));
    assert.match(switcher, /title="日本語"/);
    assert.match(switcher, /title="简体中文"/);
    const visible = value => value.replace(/<span class="lang-ko"[^>]*>[\s\S]*?<\/span>/g,'');
    for (const part of [content(article),section(article,'trip-flights'),section(article,'trip-expenses'),section(article,'trip-locations')]) {
      assert.doesNotMatch(visible(part), /[가-힣]/);
    }
  }
});

function mapCoordinates(html) {
  const encoded = html.match(/<astro-island[^>]*props="([^"]*)"/)?.[1];
  assert.ok(encoded, 'Missing rendered map data');
  const props = JSON.parse(encoded.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>'));
  const stops = props.routes ? props.routes[1].map(([,route]) => route.locations[1]) : [props.locations[1]];
  return stops.map(route => route.map(([,location]) => [location.lat[1], location.lng[1], location.order[1], location.type?.[1]]));
}

test('changing language preserves home and article map stops and route geometry', () => {
  for (const lang of ['en','ja','zh']) {
    const home = readFileSync(new URL(`../dist/${lang}/index.html`, import.meta.url),'utf8');
    assert.deepEqual(mapCoordinates(home), mapCoordinates(homeKo));
    assert.deepEqual(mapCoordinates(readPage(`${lang}/`)), mapCoordinates(korean));
  }
});

test('timeline pages and header navigation preserve all four language routes', () => {
  for (const lang of ['ko','en','ja','zh']) {
    const prefix = lang === 'ko' ? '' : `${lang}/`;
    const timeline = readFileSync(new URL(`../dist/${prefix}timeline/index.html`,import.meta.url),'utf8');
    assert.match(timeline,new RegExp(`<html lang="${lang}"`));
    assert.match(timeline,new RegExp(`href="/posts/${slug}/${lang === 'ko' ? '' : `${lang}/`}"`));
    for (const code of ['ko','en','ja','zh']) assert.match(timeline,new RegExp(`data-language-choice="${code}"`));
    if (lang !== 'ko') {
      const home = readFileSync(new URL(`../dist/${lang}/index.html`,import.meta.url),'utf8');
      assert.match(home,new RegExp(`href="/${lang}/timeline/"`));
      const cards = [...timeline.matchAll(/<a[^>]*class="timeline-card[^\"]*"[^>]*>([\s\S]*?)<\/a>/g)];
      assert.equal(cards.length,29);
      for (const card of cards) assert.doesNotMatch(card[1],/[가-힣]/);
    }
  }
});
