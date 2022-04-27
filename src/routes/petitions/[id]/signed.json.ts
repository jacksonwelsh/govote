import { petitionSigned } from '$lib/govote';
import type { RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const get: RequestHandler = async ({ request, params, url }) => {
  //Get id from the parameters.
  //We have this because the file is named [id].json.js
  const _id = params.id;

  console.log({ idx: url.searchParams.get('idx') });
  try {
    const data = await petitionSigned(new ObjectId(_id), new ObjectId("626824f5bf637ac3fb6a9ba5"));

    return {
      headers: { 'content-type': 'application/json' },
      //We don't need to stringify it because of this
      //https://github.com/sveltejs/kit/issues/1226
      body: data,
    };
  } catch (error) {
    return {
      status: 500,
      headers: { 'content-type': 'application/json' },
      body: { title: 'Something Happened', desc: error.message },
    };
  }
};
