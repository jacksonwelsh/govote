#!/bin/bash
#This script puts filler petitions, users, and groups in the website
function addPetition() {
	mongo govote --eval "lipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
		db.petitions.insert({title: '$1', desc: lipsum});"
}
#You don't have to worry about it overflowing with petitions if you run this multiple times because it will delete all the petitions
#But you do have to be careful to not run this if you want to keep your data
mongo govote --eval "db.dropDatabase();"
addPetition 'Abolish the parking department'
addPetition 'Another Great Petition'
addPetition 'Make the Union more welcoming'
addPetition 'Make Physics 1710 (Mechanics) Easier'
addPetition 'Computer Science majors should not have to take EENG 2710!'
addPetition 'Add more night/weekend classes'
addPetition 'Change the requriements for students graduating Summa Cum Laude'
addPetition 'Make a new DP parking permit only valid for Discovery Park'
addPetition 'Require students to wear masks at social gatherings'
addPetition 'Update myUNT to show an itemized bill for each semester'
mongo govote --eval "db.petitions.find()"
