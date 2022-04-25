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

//Representatives absolutely suck because we need to make sure that the representatives followers gets updated too.

//Returns a voter's representative list
export async function getRepresentatives(voterId: ObjectId): ObjectId[]{
	return collections.voters.findOne({ _id: voterId}).representatives || [];
}
export async function getFollowers(voterId: ObjectId): ObjectId[]{
	return collections.voters.findOne({ _id: voterId}).followers || [];
}
//Sets a voter's representative list,
//Updates followers for the representatives
export async function setRepresentatives(voterId: ObjectId, newRepresentatives: ObjectId[]){
	//Get the old representative list from the db
	const oldRepresentatives: ObjectId[] = await getRepresentatives(voterId);

	//Update the representatives being added to include the voter as a follower
	//Hilariously, this can be done asynchronously because each representative has a separate follower array, so there is no data race
	const additions: ObjectId[] = newRepresentatives.filter((rep) => {return !oldRepresentatives.includes(rep)});
	additions.forEach((rep) => addFollower(rep, voterId));


	//Update the representatives being removed to remove the voter from their followers
	//Even more hilariously, there is no data race between the additions and the removals because they are disjoint sets
	const removals: ObjectId[] = oldRepresentatives.filter((rep) => {return !newRepresentatives.includes(rep)});
	removals.forEach((rep) => removeFollower(rep, voterId));
	additions.forEach((representative) => removeFollower(representative, voterId));

	//There is no cursor.update function, so we need to use the collection.update function
	collections.voters.update({
		_id: voterId
	}, {
		$set: {
			representatives: newRepresentatives
		}
	});
}
export async function setFollowers(voterId: ObjectId, newRepresentatives: ObjectId[]){
	//Nothing fancy in this one, just update the db

	//There is no cursor.update function, so we need to use the collection.update function
	collections.voters.update({
		_id: voterId
	}, {
		$set: {
			followers: newFollowers
		}
	});
}
//Does a check to see if the representative is in the voter's representative list
export async function isRepresentative(voterId: ObjectId, representativeId: ObjectId): boolean{
	return getRepresentatives(voterId).then(reps => reps.includes(representativeId));
}
//Does a check to see if the representative is in the voter's representative list
export async function isFollower(representativeId: ObjectId, followerId: ObjectId): boolean{
	return getFollowers(representativeId).then(reps => reps.includes(followerId));
}
//Adds the representative to the representatve list, if they aren't already one
export async function addRepresentative(voterId: ObjectId, representativeId: ObjectId, index: number = 0){
	const representatives: ObjectId[] = await getRepresentatives(voterId);
	if(!representatives.includes(representativeId)){
		representatives.splice(index, 0, representativeId);
		setRepresentatives(voterId, representatives);
	}
}
//Adds the representative to the end of the representatve list, if they aren't already one
export async function pushRepresentative(voterId: ObjectId, representativeId: ObjectId){
	const representatives: ObjectId[] = await getRepresentatives(voterId);
	if(!representatives.includes(representativeId)){
		representatives.push(representativeId);
		setRepresentatives(voterId, representatives);
	}
}
//Adds the representative to the representatve list, if they aren't already one
//Follower order doesn't matter as it's just a set
export async function addFollower(representativeId: ObjectId, followerId: ObjectId){
	const followers: ObjectId[] = await getFollowers(representativeId);
	if(!followers.includes(followerId)){
		followers.push(followerId);
		setFollowers(representativeId, followers);
	}
}
export async function removeRepresentative(voterId: ObjectId, representativeId: ObjectId){
	//Get the array of representatives from the db
	const representativeList: ObjectId[] = await getRepresentatives(voterId);

	//Try to minimize api calls
	if(!representativeList.includes(representativeId)) return;

	//Remove the representative from the array
	const newRepresentativeList: ObjectId[] = representativeList.filter(function(value, index, arr){ 
		return value != representativeId;
	});

	//Update the db
	setRepresentatives(voterId, newRepresentativeList);
}
export async function removeFollower(representativeId: ObjectId, followerId: ObjectId){
	//Get the array of followers from the db
	const followerList: ObjectId[] = await getFollowers(representativeId);

	//Try to minimize api calls
	if(!followerList.includes(followerId)) return;

	//Remove the follower from the array
	const newFollowerList: ObjectId[] = followerList.filter(function(value, index, arr){ 
		return value != followerId;
	});

	//Update the db
	setFollowers(representative, newFollowerList);
}
export async function reorderRepresentatives(representatives: ObjectId[], voterId: ObjectId){
	//Get current representatives
	//Assert that they are the same representatives, albeit in a different order
	//Set the representatives in the db to the new array
	setRepresentatives(voterId, representatives);
}
