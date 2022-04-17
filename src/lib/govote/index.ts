import { collections } from '$lib/mongo';
import { ObjectId } from 'mongodb';
import assert from 'assert';

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
	const petition = collections.petitions.findOne({ _id: petitionId });
	const voter = collections.voters.findOne({ id_: voterId }); assert.notStrictEqual(voter, undefined, "Couldn't find a voter with that id");

	const petitionsVotedFor = voter.petitionsVotedFor;

	//Check to see if the vote isn't overruled
	//If the one voting is the person, disregard the checks
	//If they haven't voted, go ahead and vote
	if((voterId != representativeId) && (petitionsVotedFor.includes(petitionId))){
		assert.notStrictEqual(petition.votes[voterId], undefined, "The voter says it voted but the petition doesn't");

		//If the petition had already been voted for, we have to check if the representative is higher than the one that already voted
		if((voter.representatives.indexOf(petition.votes[voterId].representative) < voter.representatives)){

			//Don't vote and don't propogate
			return;
		}
	}

	//If you're a group, don't vote
	if(!(voter.isGroup)){
		//Vote
		collections.petitions.updateOne({ _id: petitionId },
			{
				$set: { ["votes."+voterId] : votingOptions },
				$currentDate: { lastModified: true }
			}
		);

		//Could possibly get duplicates if there are two calls at once. Need a set, but you can't BSON a set.
		if(!petitionsVotedFor.includes(petitionId)){
			collections.voters.updateOne({id_: voterId}, {
				$push: {
					petitionsVotedFor: petitionId
				}
			});
		}
	}

	propagate(voter.followers, petitionId, votingOptions);
}

//answerIndex defaults to 0, which is "Approve"
export async function petitionVotes(petitionId: ObjectId, answerIndex: number = 0): number{
	let count = 0;
	const petition = await collections.petitions.findOne({ _id: petitionId });
	for(let vote of Object.values(petition.votes)){
		//vote is a votingOptions interface, so we can get the answerIndex
		if(vote.answerIndex == answerIndex) ++count;
	}
	return count;
}

//Returns a ratio of approve votes to disapprove votes.
//Assuming that the petition has only two answers, Approve: 0 and Disapprove: 1
//and that we want higher viability to mean more approval
export async function petitionViability(petitionId: ObjectId): number{
	const yeas: number = await petitionVotes(petitionId, 0);
	const nays: number = await petitionVotes(petitionId, 1);
	if((yeas + nays) == 0) return 0;
	return yeas / (yeas + nays);
}

export async function petitionSignatures(petitionId: ObjectId, answerIndex: number = 0): number{
	let count = 0;
	const petition = await collections.petitions.findOne({ _id: petitionId });
	for(let vote of Object.keys(petition.votes)){
		//vote is a votingOptions interface, so we can get the answerIndex
		if(vote == petition.votes[vote].representative && petitions.votes[vote].answerIndex == answerIndex) ++count;
	}
	return count;
}
