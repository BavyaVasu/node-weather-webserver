
const request = require('request')

const geoCode = (address,callback) =>{
    const mapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYmF2eWEiLCJhIjoiY2sxcmwzdGdoMDV4dTNvbGl6Z2dpNGl3bSJ9.1R5AGUwaWabDX4Ojk2Fq5A&limit=1'
    
    request({url:mapbox,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to Geocode service!!',undefined)
        }else if(body.features.length === 0){
            callback('unable to find location!!',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}
const forecast=(latitude,longitude,callback)=>{
    const darksky = 'https://api.darksky.net/forecast/32a2eb818efd530b5f5bbc9c40ae282a/'+latitude+','+longitude

    request({url:darksky,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to Weather service!!',undefined)
        }else if(body.error){
            callback('unable to find location!!',undefined)
        }else{
            const temp=body.currently.temperature
            const rain_chance=body.currently.precipProbability
            callback(undefined,('It is currectly ' +temp+ ' degree out. There is a '+rain_chance+'% chance of rain') )
        }
    })

}


module.exports = {
    geoCode: geoCode,
    forecast: forecast
}