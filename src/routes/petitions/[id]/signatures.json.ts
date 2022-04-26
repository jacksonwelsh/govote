import { petitionSignatures } from '$lib/govote';
import type { RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const get: RequestHandler = async ({ request, params, url }) => {
  //Get id from the parameters.
  //We have this because the file is named [id].json.js
  const _id = params.id;

  console.log({ idx: url.searchParams.get('idx') });
  try {
    const entry = await petitionSignatures(
      new ObjectId(_id),
      0
    );

    return {
      headers: { 'content-type': 'application/json' },
      //We don't need to stringify it because of this
      //https://github.com/sveltejs/kit/issues/1226
      body: entry,
    };
  } catch (error) {
    return {
      status: 500,
      headers: { 'content-type': 'application/json' },
      body: { title: 'Something Happened', desc: 'Error 500: Something Happened' },
    };
  }
};
