import { addRepresentative } from '$lib/govote';
import type { RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

//Captures a POST request that has an object like this
//{
//	voterId: ObjectId,
//	representativeId: ObjectId,
//	index: number = 0
//}
export const post: RequestHandler = async ({request, params}) => {
  //Get id from the parameters.

  let data = undefined; //Feels dirty using a let here, but it's the only way

  try {
    data = await request.json();	//We can have this since it's a push request
  } catch (error) {
    return {
      status: 500,
      headers: { 'content-type': 'application/json' },
      body: { title: 'Error reading JSON', desc: error.message },
    };
  }

  if (!data) {
    return {
      status: 500,
      headers: { 'content-type': 'application/json' },
      body: { title: 'No POST data', desc: 'Client failed to supply voting options' },
    };
  }

  try {
    const entry = await addRepresentative(
      new ObjectId(data.voterId),
      new ObjectId(data.representativeId),
      data.index
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
      body: { title: 'Something Happened', desc: error.message, st: error.stack },
    };
  }
};
