const express = require('express');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');

require('./db/mongoose.js');
require('dotenv/config');

const initializePassport = require('./config/passport'); //lấy hàm cấu hình passport để gọi
initializePassport(passport);

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //để parse request về json 

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(passport.initialize()); 
app.use(passport.session());
//để khi mà handler bất kỳ 1 req nào, 2 
//sau khi đăng nhập, mọi request handle đều xài đc thằng req.user  

app.use('/', shopRouter);
app.use('/products', productRouter);
app.use('/api', apiRouter);
app.use('/order', orderRouter);
app.use('/auth', authRouter);
app.use('/cart', cartRouter);
app.use('/user', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
});
