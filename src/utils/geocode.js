const request = require('request');

const geoCode =(address, cb) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFoYW1zYWRkaXF1aSIsImEiOiJja2FyN2xobHowN2hsMnBvNXFvY2NjYTk0In0.l7SsQvn--aRJH_8tjWHMNQ&limit=1'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            cb('Unable to connect!', undefined)
        }else if(response.body.features.length === 0) {
            cb('Unable to find Location!!', undefined)
        }else {
            cb(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            });
        }
    });
};

module.exports = geoCode;