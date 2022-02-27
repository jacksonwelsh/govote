#!/bin/bash
#This script puts filler petitions, users, and groups in the website
sudo apt-get install mongodb
mongo govote --eval "db.dropDatabase(); lipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'; db.petitions.insert({title: 'Abolish the parking department', desc: lipsum}); db.petitions.find({})"
