const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

// public is the only directory setup to be exposed by the web server.
// Define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup Dynamic directory to server - handlebars - it render dynamic document other then static, also create reuseable code
// Express search for 'templates' directory explicitly inside project's root, if you havent named it as 'templates' then u need to tell this to express

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup Static directory to server
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Maham'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Maham'
    })
});

app.get('', (req, res) => {
    res.send('<h1>Maham</h1>')
});

app.get('/help', (req, res) => {
    res.send({
        title: 'Help',
        name : 'Maham',
        age: '24'
    })
});

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name : 'Maham',
        errorMessage: 'About Article not found'
    })
});

app.get('/weather', (req, res) => {

    console.log(req.query.address)

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    });
});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name : 'Maham',
        errorMessage: 'Page not found'
    })
});

app.listen(port, () => {
    console.log("Server is up on port " + port)
});