//Load and initialise express

const express = require('express')
const app = express()

//Importing the controller function
const getData=require('./Controllers/productsData')
const productsData = getData()

//setup view engine
app.set('view engine', 'ejs') 
app.set('views', './Views')

//Setting up Middleware
app.use((req,res,next)=>{
    console.log(`running Middleware function`)
    next()  
})
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Root route
app.get('/',(req,res)=>{
    
    res.render('home',{
        pageTitle: 'ECommerce App', 
        pageHeader: 'Welcome to the Ecommerce Page',
        
    })
   
})

//All Products Details Route
app.get('/products',(req,res)=>{
    
    res.render('products',{
        pageTitle: 'ECommerce App', 
        pageHeader: 'Products Page',
        data : productsData
    })
   
})

//Add a new Product Route

app.get('/products/new',(req,res)=>{
    res.render('newprod')
})

//Search Product by ID Route
app.get('/products/:id',(req,res)=>{
    console.log(req.params.id)
    if(req.params.id <= productsData.length -1)
    {
    res.render('item',{
        pageTitle: 'ECommerce App',
        pageHeader: 'Product Details',
        data : productsData[req.params.id - 1 ]
    })
    } 
    else{
        res.status(404).send('<h2> 404 Page Not found </h2>')
    }  
})

//Post the new product in the Products page
app.post('/products', (req, res) =>{
  
    productsData.push(req.body)
    res.redirect('/products')
})

app.all('*',(req,res)=>{
    res.status(404).send('<h2> 404 Page Not found </h2>')
})

app.listen(3001,()=>{
    console.log(`Running Server`)
})