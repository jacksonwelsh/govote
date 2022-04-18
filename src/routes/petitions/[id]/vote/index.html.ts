import { vote, votingOptions } from '$lib/govote';
import type { RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

//Captures a POST request that has an object like this
//{
//	voterId: ObjectId,
//	answerIndex: number,
//	representative: ObjectId
//}
export const get: RequestHandler = async (request) => {
	//Get id from the parameters.
	//We have this because the path is [id]/vote
	const _id = request.params.id;
	
	let data = undefined;	//Feels dirty using a let here, but it's the only way

	try{
		data = (request.json && await request.json());
	}catch(error){
		return {
                        status: 500,
                        headers: { 'content-type': 'application/json' },
                        body: { title: 'Error reading JSON', desc: error.message },
                };
	}

	if(!data){
		return {
                        status: 500,
                        headers: { 'content-type': 'application/json' },
                        body: { title: 'No POST data', desc: "Client failed to supply voting options" },
                };
	}

	try{
		const entry = await vote(new ObjectId(data.voterId), new ObjectId(_id), data as Pick<votingOptions, keyof votingOptions>);

		return {
			headers: { 'content-type': 'application/json' },
			//We don't need to stringify it because of this
			//https://github.com/sveltejs/kit/issues/1226
			body: entry,
		};
	}catch(error){
		return {
	                status: 500,
	                headers: { 'content-type': 'application/json' },
	                body: { title: 'Something Happened', desc: error.message },
	        };
	}
};
