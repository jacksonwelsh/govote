import { collections } from '$lib/mongo';
import type { RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

interface LoginData {
  username: string;
  password: string;
}

export const post: RequestHandler = async ({ request }) => {
  const userCollection = collections.users;

  if (!userCollection)
    return {
      status: 500,
      body: 'Could not access users.',
    };

  // user collection verified to exist

  const data = (await request.json()) as LoginData;
};
