//require all necessary files
const https = require('https');
const http = require('http');
const api = require('./key.json');

//get the city argument from the console and make it into a query
const location = process.argv.slice(2).join('_').replace(' ', '_');
const readableLoc = location.replace('_', ' ');

//make a get request to the API with your key and city

//call a print function to print out the information to the console.
//handle any errors

