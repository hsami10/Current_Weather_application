const getWeather = require('./weather.js');

//get the city argument from the console and make it into a query
const location = process.argv.slice(2).join('_').replace(' ', '_');
getWeather(location);

