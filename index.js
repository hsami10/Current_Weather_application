//require all necessary files
const https = require('https');
const http = require('http');
const api = require('./key.json');

//get the city argument from the console and make it into a query
const location = process.argv.slice(2).join('_').replace(' ', '_');
const readableLoc = location.replace('_', ' ');

//make a get request to the API with your key and city
const request = https.get(
    `https://api.wunderground.com/api/${api.key}/conditions/q/${location}.json`, res => {
        let body = '';

        res.on('data', chunk => {
            body += chunk.toString();
        });

        res.on('end', () => {
            //parse body string into json
            const weather = JSON.parse(body);
            //print relevent data to the console. Wind string starts with 'From', so slice out F from string and print f.
            const printString = `Current temperature in ${weather.current_observation.display_location.full} is ${weather.current_observation.temperature_string}, with winds f${weather.current_observation.wind_string.slice(1)}.`;
            console.log(printString);
        });
    }
);


//handle any errors

