#!/bin/bash
sudo apt-get install mongodb	#Make sure it's installed
mongo govote --eval "db.dropDatabase(); db.createCollection('petitions'); db.createCollection('users'); db.createCollection('groups'); db.getCollectionNames()"
