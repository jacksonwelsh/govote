import { init } from "$lib/mongo/mongo";

export async function get(request){
	const { db } = await init();

	const posts = await db.collection("petitions").find().toArray();

	return {
		headers: { 'content-type': 'application/json' },
                //We don't need to stringify it because of this
                //https://github.com/sveltejs/kit/issues/1226
		body: posts
	};
}
