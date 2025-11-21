const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const {logger} = require('./middleware/logEvents.js')
const {errorHandler} = require('./middleware/errorHandler.js')
const PORT = process.env.PORT || 3500;

app.use(logger)
app.use('/' , require('./Router/root'));
app.use('/subdir' , require('./Router/subdir.js'));

const whiteLists = ['https://www.yoursite.com' , 'http://localhost:3500'];

const corsOptions = {
    origin : (origin , callback) =>{
        if(whiteLists.indexOf(origin) !== -1 || !origin) {
            callback(null,true)
        } else{
            callback(new Error('not allowed by CORS'))
        }
    },
    OptionssuccessStatus : 200
}
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended : false}))
app.use(express.json())
app.use(express.static(path.join(__dirname , '/public')));


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