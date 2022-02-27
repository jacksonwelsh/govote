import { MongoClient } from "mongodb";

let client = null;
let db = null;

export async function init(){
	client = client || await MongoClient.connect("mongodb://localhost");
	db = db || client.db("govote");
	return {
		client: client,
		db: db
	};
}
