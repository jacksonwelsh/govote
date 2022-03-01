#!/bin/bash
sudo apt-get install mongodb
./initializeMongodbServer.sh #This might fail if the server runs after installing
./initializeDatabase.sh
./fillDatabase.sh
