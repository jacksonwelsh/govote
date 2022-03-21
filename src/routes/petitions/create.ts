import { collections } from '$lib/mongo';
import type { RequestHandler } from '@sveltejs/kit';
import type Petition from '$lib/models/petition';
import { colleges } from '$lib/constants';

/**
 * Checks if a string has too many capital letters (anti-caps lock)
 * @param str String to check
 * @param threshold What proportion of characters may be capital
 * @returns True if the string satisfies the requirements, false if not.
 *
 * @example
 * ```ts
 * > checkAllCaps('VERY IMPORTANT MESSAGE') // will flag, 100% caps
 * false
 * > checkAllCaps('OnLy HaLf CaPs') // will not flag, 50% caps (default threshold: 70%)
 * true
 * > checkAllCaps('CUSTOM value', 1.0) // requires entire string to be caps to flag
 * true
 * ```
 */
const checkAllCaps = (str: string, threshold = 0.7): boolean => {
  let numCaps = 0;
  for (let i = 0; i < str.length; ++i) if (str.charAt(i).match(/[A-Z]/)) ++numCaps;

  if (numCaps / str.length > threshold) return false;
  return true;
};

const validate = ({ title, description, college }: Petition): string[] => {
  const errors = [];

  // requirement: 10 <= title.length <= 255
  if (title.length > 256) errors.push('Petition title must be less than 256 characters.');
  if (title.length < 10) errors.push('Petition title must be at least 10 characters');

  // requirement: title may not be all caps
  if (!checkAllCaps(title)) errors.push('Petition title must not be all caps');

  // requirement: 1,000 <= description.length <= 15,000
  if (description.length < 1_000) errors.push('Description must be at least 1000 characters');
  if (description.length > 15_000) errors.push('Description must be lest than 15,000 characters');

  // requirement: submitted college must be a member of our list of colleges (presented as a college code i.e. COE)

  console.log({
    keys: Object.keys(colleges),
    v: college,
    incl: Object.keys(colleges).includes(college),
  });
  if (!Object.keys(colleges).includes(college))
    errors.push(
      `Selected college must be a member of the GoVote colleges list. Contact an administrator to add '${college}' to the list.`
    );

  return errors;
};

export const post: RequestHandler = async ({ request }) => {
  const json = await request.json(); // get data from the request
  const data = json as Pick<typeof json, keyof Petition>; // remove any fields we haven't defined

  const errors = validate(data);

  if (errors.length === 0) {
    // no errors, add to DB and return ID to route users
    const result = await collections.petitions.insertOne({
      ...data,
      _id: undefined, // do not allow users to set ID
    });
    return {
      status: 201,
      body: {
        id: result.insertedId,
      },
    };
  }

  // error(s) occurred, let the user know and do not commit.
  return {
    status: 400,
    body: { errors },
  };
};
