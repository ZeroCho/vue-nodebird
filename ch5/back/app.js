const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const db = require('./models');
const passportConfig = require('./passport');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const app = express();

db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:3080',
  credentials: true,
}));
app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie('cookiesecret'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'cookiesecret',
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.status(200).send('안녕 제로초');
});

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);

app.post('/post', (req, res) => {
  if (req.isAuthenticated()) {

  }
});

app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});
