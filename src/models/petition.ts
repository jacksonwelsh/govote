import type { ObjectId } from 'mongodb';

export default class Petition {
	constructor(
		public title: string,
		public description: string,
		public college: string,
		public id?: ObjectId
	) {}
}
