const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const {logger} = require('./middleware/logEvents.js')
const {errorHandler} = require('./middleware/errorHandler.js')
const corsOptions = require('./config/corsOptions.js');
const PORT = process.env.PORT || 3500;

app.use(logger)
app.use(express.urlencoded({ extended : false}))
app.use(express.json())
app.use(cors(corsOptions))

// Routes
app.use('/' , require('./Router/root'));
app.use('/subdir' , require('./Router/subdir.js'));
app.use('/employee' , require('./Router/api/employee.js'))
app.use('/',express.static(path.join(__dirname , '/public')));
app.use('/subdir',express.static(path.join(__dirname , '/public')));


/* app.get(/^\/about(.html)?$/ , (req,res,next) => {
    console.log("try to loading the page");
    next();
}, (req,res) => {
    res.send("hi hello ")
})


const one = (req,res,next) =>{
    console.log("one")
    next();
}

const two = (req,res,next) =>{
    console.log("two")
    next();
}

const three = (req,res) =>{
    console.log("three")
    res.send("finished")
}

app.get(/^\/chain(.html)?$/, [one, two, three]);
 */

app.all(/^\/.*$/ , (req,res) =>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname , 'views' , '404.html'))
    }
    else if(req.accepts('json')){
        res.json({'err' : '404 page not found'})
    }
    else{
        res.type('text').send('404 page not found')
    }
})


app.use(errorHandler)

app.listen(PORT , () =>{
    console.log(`server running on port ${PORT}`);
})