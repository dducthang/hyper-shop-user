const express = require('express');
const path = require('path');
const morgan = require('morgan');
require('./db/mongoose.js');
require('dotenv/config');

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));

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
