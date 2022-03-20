import * as mongo from 'mongodb';
import env from '../../environment';

export const collections: {
	petitions?: mongo.Collection;
	users?: mongo.Collection;
	groups?: mongo.Collection;
} = {};

export async function init() {
	const client: mongo.MongoClient = new mongo.MongoClient(env.DB_CONN_STRING);
	await client.connect();

	const db: mongo.Db = client.db(env.DB_NAME);

	collections.petitions = db.collection('petitions');
	collections.users = db.collection('users');
	collections.groups = db.collection('groups');
}
