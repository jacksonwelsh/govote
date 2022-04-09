import * as mongo from 'mongodb';
import env from '../../environment';

export const collections: {
	petitions?: mongo.Collection;
	voters?: mongo.Collection;
	users?: mongo.Collection;
} = {};

export async function init() {
	const client: mongo.MongoClient = new mongo.MongoClient(env.DB_CONN_STRING);
	await client.connect();

	const db: mongo.Db = client.db(env.DB_NAME);

	collections.petitions = db.collection('petitions');
	collections.voters = db.collection('voters');
	collections.users = db.collection('users');
}
