import { collections } from '$lib/mongo';
import type { RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const get: RequestHandler = async ({ request, params, url }) => {

  const query = JSON.parse(url.searchParams.get('query'));	//Query is literally an object I send through the url. The object is called query. Like search?query=JSONSTUFF

  if(query._id){
    if(typeof (query._id) == 'string') query._id = new ObjectId(query._id);
    else if(query._id["$in"]) query._id["$in"] = query._id["$in"].map((id) => new ObjectId(id));
  }

  const posts = await collections.petitions?.find(query).toArray();

  return {
    headers: { 'content-type': 'application/json' },
    //We don't need to stringify it because of this
    //https://github.com/sveltejs/kit/issues/1226
    body: posts,
  };
};
