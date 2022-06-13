const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Alvaro Zaragoza'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather App',
        name: 'Alvaro Zaragoza'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Alvaro Zaragoza',
        help: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
    })
})

app.get('/help/*', (req, res) => {
    res.render('help404', {
        title: 'Help',
        name: 'Alvaro Zaragoza',
        msg: 'Help article not found'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    const address = encodeURI(req.query.address)
    geocode(address, (error, { lat, long, place } = {}) => {
        if (error) {
            return res.send({ error })
        }

        const latitude = lat
        const longitude = long
        forecast( latitude, longitude, (error, { cond, temp, feel }) => {
            if (error) {
                return res.send({ error })
            }

            res.send( {
                weather: {
                    address: req.query.address,
                    place_found: place,
                    latitude: lat,
                    longitude: long,
                    condition: cond,
                    temperature: temp,
                    feeling: feel
                }
            })
        })   
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Alvaro Zaragoza'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})