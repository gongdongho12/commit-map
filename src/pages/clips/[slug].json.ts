import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildClipPayload } from '../../lib/clipPayload';

export const prerender = true;

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  return posts.map(post => ({
    params: { slug: post.id.replace(/\.md$/, '') },
    props: { post },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const payload = buildClipPayload(props.post);

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
