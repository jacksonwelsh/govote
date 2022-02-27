const mongo = require("mongodb");

let client = null;
let db = null;

export async function init(){
	client = client || await mongo.MongoClient.connect("mongodb://localhost");
	db = db || client.db("govote");
	return client.db("govote");
}
