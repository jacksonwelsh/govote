import { petitions, users, groups } from '$lib/mongo';
import { ObjectId } from 'mongodb';

interface votingOptions{
	answerIndex: number;
	representative: ObjectId;
}

async function propagate(followers: Array<ObjectId>, petitionId: ObjectId, votingOptions: votingOptions = {answerIndex: 0, representative: voterId}){
	//Representatives is an array of voterIds
	for(let follower of followers){
		vote(follower, petitionId, votingOptions);
	}
}

//export async function follow(followerId: ObjectId, representativeId: representative)

export async function vote(voterId: ObjectId, petitionId: ObjectId, votingOptions: votingOptions = {answerIndex: 0, representative: voterId}){
	const petition = petitions.findOne({ _id: petitionId });
	const user = users.findOne({ id_: voterId });

	//User
	if(users != undefined){
		const petitionsVotedFor = user.petitionsVotedFor;

		//Check to see if the vote isn't overruled
		//If the one voting is the person, disregard the checks
		if((voterId != representativeId) &&
			//If they haven't voted, go ahead and vote
			(petitionsVotedFor.includes(petitionId) &&
			//If the petition had already been voted for, we have to check if the representative is higher than the one that already voted
			(user.representatives.indexOf(petition.votes[voterId].representative) < user.representatives)){

			//Don't vote and don't propogate
			return;
		}

		//Vote
		petitions.updateOne({ _id: petitionId },
			{
				$set: { ("votes."+voterId) : votingOptions },
				$currentDate: { lastModified: true }
			}
		);

		//Could possibly get duplicates if there are two calls at once. Need a set, but you can't BSON a set.
		if(!petitionsVotedFor.includes(petitionId)){
			users.updateOne({id_: voterId},
				$push: {
					petitionsVotedFor: petitionId
				}
			});
		}

		propagate(user.followers, petitionId, votingOptions);
	//Group
	}else{
		//The voter is a group. Propagate but don't actually vote for the petition.
		const group = groups.findOne({ id_: voterId });
		if( group == undefined ){	//Maybe if nodejs has an assert() we could use that here
			throw new Error("User or group id not found");
		}

		const petitionsVotedFor = group.petitionsVotedFor;

		//Check to see if the vote isn't overruled
		//If the one voting is the person, disregard the checks
		if((voterId != representativeId) &&
			//If they haven't voted, go ahead and vote
			(petitionsVotedFor.includes(petitionId) &&
			//If the petition had already been voted for, we have to check if the representative is higher than the one that already voted
			(group.representatives.indexOf(petition.votes[voterId].representative) < group.representatives)){

			//Don't vote and don't propogate
			return;
		}

		if(!petitionsVotedFor.includes(petitionId)){
			group.updateOne({id_: voterId},
				$push: {
					petitionsVotedFor: petitionId
				}
			});
		}

		//Propagate
		propagate(group.followers, petitionId, votingOptions);
	}
}
