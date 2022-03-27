import { petitions, users, groups } from '$lib/mongo';
import { ObjectId } from 'mongodb';

async function propagate(voterId: ObjectId, petitionId: ObjectId, userOrGroup: boolean){
	//Basically try voting for everyone. Should just call vote() for every follower of the voter.
	const voter = userOrGroup? users.findOne({ id_: voterId }) : groups.findOne({ id_: voterId });
}

export async function vote(voterId: ObjectId, petitionId: ObjectId, reasonVoterId: ObjectId) {
	const petition = petitions.findOne({ _id: petitionId });
	const user = users.findOne({ id_: voterId });
	
	//User
	if(users != undefined){
		const petitionsVotedFor = user.petitionsVotedFor;

		//Propagate
	
	//Group
	}else{
		//The voter is a group. Propagate but don't actually vote for the petition.
		const group = groups.findOne({ id_: voterId });
		if( group == undefined ){	//Maybe if nodejs has an assert() we could use that here
			throw new Error("User or group Id not found");
		}

		//Propagate
	}
}
