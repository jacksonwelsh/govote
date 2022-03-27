#!/bin/bash
mongo govote --eval "db.dropDatabase(); db.createCollection('petitions'); db.createCollection('voters'); db.getCollectionNames()"
