import { collections } from '$lib/mongo';

export async function get() {
	const posts = await collections.petitions?.find().toArray();

	return {
		headers: { 'content-type': 'application/json' },
		//We don't need to stringify it because of this
		//https://github.com/sveltejs/kit/issues/1226
		body: posts
	};
}
