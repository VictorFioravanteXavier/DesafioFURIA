require('dotenv').config();

const express = require('express');
const { default: mongoose } = require('mongoose');

const app = express();
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('pronto')
    })
    .catch(e => console.log(e))

const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')

const routes = require('./routes');
const path = require('path');
const csfr = require('csurf')
const { middlewareGlobal, checkCsrfError, csrfMidlleware } = require("./src/middlewares/middleware");

  
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'public')))

const sessionOptions = session({
    secret: process.env.SECRET_KEY,
    store: MongoStore.create({ 
        mongoUrl: process.env.CONNECTIONSTRING 
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true 
    }
})

app.use(sessionOptions)
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

const apiRoutes = require('./apiRoutes');
app.use('/api', apiRoutes);

app.use(csfr())
// nossos proprios middlewares
app.use(middlewareGlobal)
app.use(checkCsrfError)
app.use(csrfMidlleware)
app.use(routes);



app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
})
