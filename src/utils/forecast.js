const request = require('postman-request')

const forecast = (latitude, longitude, callback ) => {

    const url = 'http://api.weatherstack.com/current?access_key=f2283059712245a42d204041f0e3880e&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect to Weather Stack API')

        } else if(body.error) {
             callback(body.error.info)
               
        } else {   
            data = {
                temp: body.current.temperature,
                feel: body.current.feelslike,
                cond: body.current.weather_descriptions[0]
            }

            callback( undefined, data )
        }
    })
}

module.exports = forecast