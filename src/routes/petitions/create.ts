import { collections } from '$lib/mongo';

/** @type {import('./create').RequestHandler} */
export const post = async ({ request }) => {
  const data = await request.formData();

  // stub: do validations and create petition. Consider using helper methods.
};
