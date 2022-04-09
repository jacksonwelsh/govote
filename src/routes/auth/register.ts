import User from '$lib/models/user';
import { collections } from '$lib/mongo';
import type { RequestHandler } from '@sveltejs/kit';

interface RegistrationData {
  username: string;
  password: string;
  name: string;
  college: string;
}

export const post: RequestHandler = async ({ request }) => {
  const userCollection = collections.users;

  if (!userCollection)
    return {
      status: 500,
      body: 'Could not access users.',
    };

  // user collection verified to exist

  const json = await request.json();
  const data = json as Pick<typeof json, keyof RegistrationData>;
  const userModel = new User(data.username, data.password, data.college, data.name);

  const result = await userCollection.insertOne({ ...userModel, _id: undefined });
  return {
    status: 201,
    body: {
      id: result.insertedId,
    },
  };
};
