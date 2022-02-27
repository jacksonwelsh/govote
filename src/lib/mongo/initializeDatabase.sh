#!/bin/bash
mongo govote --eval "db.dropDatabase(); db.createCollection('petitions'); db.createCollection('users'); db.createCollection('groups'); db.getCollectionNames()"
