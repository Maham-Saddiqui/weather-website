const request = require('request');

const forecast = (latitude, longitude, callback) => {
    // const url2 = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude
    const url = `http://api.weatherstack.com/current?access_key=18131c66e259ef6a605a61f3f5ca4506&query= ${+ latitude + ',' + longitude} &units=f`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
};

module.exports = forecast;