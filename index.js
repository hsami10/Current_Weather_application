const weather = require('./weather.js');

//get the city argument from the console and make it into a query
const location = process.argv.slice(2).join('_').replace(' ', '_');
//call the getWeather function in weather.js to get the weather at location
weather.getWeather(location);

