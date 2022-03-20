import { collections } from '$lib/mongo';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  const posts = await collections.users?.find().toArray();

  return {
    headers: { 'content-type': 'application/json' },
    body: posts,
  };
};
