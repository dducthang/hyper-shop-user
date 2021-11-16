const express = require('express');
const path = require('path');
const morgan = require('morgan');
require('./db/mongoose.js');
require('dotenv/config');

const shopRouter = require('./routers/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));

app.use(shopRouter);


app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server is running on http://localhost:3000');
})

