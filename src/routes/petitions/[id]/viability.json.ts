import { petitionViability } from '$lib/govote';
import type { RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const get: RequestHandler = async (request) => {
  //Get id from the parameters.
  //We have this because the file is named [id].json.js
  const _id = request.params.id;
  const answerIndex = (request.json && (await request.json())) || 0;

  try {
    const entry = await petitionViability(new ObjectId(_id));

    return {
      headers: { 'content-type': 'application/json' },
      //We don't need to stringify it because of this
      //https://github.com/sveltejs/kit/issues/1226
      body: entry,
    };
  } catch (error) {
    console.error({ error, st: error.stacktrace });
    return {
      status: 500,
      headers: { 'content-type': 'application/json' },
      body: { title: 'Something Happened', desc: 'Error 500: Something Happened' },
    };
  }
};
