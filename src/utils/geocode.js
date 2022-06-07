const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent( address )+ '.json?access_token=pk.eyJ1IjoiYWx2YXJveiIsImEiOiJjbDM5NmFmaGkwMm9pM2lta28zM29yN3UyIn0.GcFUnZSyi2ySrdEO0uJXxg&limit=1'
    request({ url, json: true}, (error, {body}) => {
        if(error) {
           callback('Unable to connect to Geocoding MapBox API')
                
        } else if(body.message) {
            callback(body.message)
            
        } else if(!body.features[0]) {
            callback('Geocoding MapBox API could not find this location')
            
        } else {
            callback(null, data = {
                place: body.features[0].place_name,
                long: body.features[0].center[0],
                lat: body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode