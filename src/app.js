const path =require('path')
const express = require('express')
const hbs = require('hbs')
const geo = require('./utils/geoCode')

//paths for express config
const publicStaticPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicStaticPath))

app.get('', (req,res)=>{
    res.render('index',{
        title: 'weather app',
        name: 'bavya'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'about',
        name: 'bavya'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'help',
        name: 'bavya'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'you must provide a address'
        })
    }
    geo.geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        console.log(error);
    
        if(error){
            return  res.send({
                error
            })
        }
       
        geo.forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return  res.send({
                    err : error
                })
            }
            console.log(location)
            console.log(forecastData)
            res.send({
                address : location,
                forecast : forecastData,
            })
        })
    })   
    
})

app.get('/products',(req,res)=>{
    console.log(req.query);
    res.send({
        product : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'bavya',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'bavya',
        errorMessage: 'page not found'
    })
})

app.listen(3000, ()=>{
    console.log('server is up')
})