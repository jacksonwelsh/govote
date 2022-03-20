import { collections } from '$lib/mongo';

export async function get(request) {
	const posts = await collections.groups?.find().toArray();

	return {
		headers: { 'content-type': 'application/json' },
		//We don't need to stringify it because of this
		//https://github.com/sveltejs/kit/issues/1226
		body: posts
	};
}
