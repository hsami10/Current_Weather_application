//NO MORE THAN 10 API CALLS PER MINUTE

//require all necessary files
const https = require('https');
const http = require('http');
const api = require('./key.json');


const readableLoc = location.replace('_', ' '); //create readable location string for error messages.

//function to print error message
function printError(e) {
    console.error(e.message);
}

//function to print weather in sentence form
function printWeather(weather) {
    //Wind string starts with 'From', so slice out F from string and print f.
    const printString = `Current temperature in ${weather.current_observation.display_location.full} is ${weather.current_observation.temperature_string}, with winds f${weather.current_observation.wind_string.slice(1)}.`;
    console.log(printString);
}

//function to make a get request to the API with your key and city
function getWeather(location) {
    try {
        const request = https.get(
            `https://api.wunderground.com/api/${api.key}/conditions/q/${location}.json`, (res) => {
                if (res.statusCode === 200) {
                    let body = '';

                    res.on('data', chunk => {
                        body += chunk.toString();
                    });

                    res.on('end', () => {
                        try {
                            //parse body string into json
                            const weather = JSON.parse(body);
                            //print relevent data to the console. 
                            if (weather.current_observation.display_location) { //if specific location's data is returned
                                printWeather(weather);
                            } else {
                                const locNotFound = new Error(`The location "${readableLoc}" was not found. Make sure to enter a specific location (eg. Cleveland OH).`);
                                printError(locNotFound);
                            }
                        } catch (e) {
                            printError(e);
                        }
                    });
                } else {
                    //create human readable error message for status code. 
                    const statusCodeError = new Error(`There was an error getting the message for ${readableLoc}. (${http.STATUS_CODES[response.statusCode]})`);
                    printError(statusCodeError);
                }
            }
        );
    } catch (e) {
        printError(e);
    }
}

module.exports = getWeather;

getWeather();
