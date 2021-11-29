const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const morgan = require('morgan');
require('./db/mongoose.js');
require('dotenv/config');

//add express session
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);

const PORT = process.env.PORT || 3000;

const shopRouter = require('./routes/shop');
const productRouter = require('./routes/product');
const apiRouter = require('./routes/api');
const orderRouter = require('./routes/order');
const authRouter = require('./routes/auth');
const cartRouter = require('./routes/cart');
const userRouter = require('./routes/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));

const connectionString=process.env.CONNECTION_STRING;
const store = new MongoDbStore({
  uri:connectionString,
  collection:'session'
});

app.use(session({secret:"My secret", resave: false, saveUninitialized:false, store: store}));

app.use('/', shopRouter);
app.use('/products', productRouter);
app.use('/api', apiRouter);
app.use('/order', orderRouter);
app.use('/auth', authRouter);
app.use('/cart', cartRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
});
