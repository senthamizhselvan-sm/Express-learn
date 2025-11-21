const whiteLists = [
    'https://www.yoursite.com' , 
    'http://localhost:3500'
];

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

module.exports = corsOptions;