import { collections } from '$lib/mongo';
import type { RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const get: RequestHandler = async (request) => {
  //Get id from the parameters.
  //We have this because the file is named [id].json.js
  const _id = request.params.id;

  const query = { _id: new ObjectId(_id) }; //console.log(query);
  const entry = await collections.groups.findOne(query);

  if (entry) {
    return {
      headers: { 'content-type': 'application/json' },
      //We don't need to stringify it because of this
      //https://github.com/sveltejs/kit/issues/1226
      body: entry,
    };
  } //else
  return {
    status: 404,
    headers: { 'content-type': 'application/json' },
    body: { voterid: 'Not Found', bio: 'Error 404: not found' },
  };
};
