import User from '$lib/models/user';
import { collections } from '$lib/mongo';
import type { RequestHandler } from '@sveltejs/kit';

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

  const user = await userCollection.findOne({ username: data.username });

  const userModeled = new User(user.username, user._password, user.college, user.name, false);

  if (userModeled.validatePassword(data.password))
    return {
      body: {
        user: {
          ...user,
          _password: undefined,
        },
        token: {},
      },
    };

  return {
    status: 401,
  };
};
