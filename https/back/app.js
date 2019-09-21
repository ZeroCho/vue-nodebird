const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');
const dotenv = require('dotenv');
const http = require('http');
const https = require('https');

const prod = process.env.NODE_ENV === 'production';
const db = require('./models');
const passportConfig = require('./passport');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const hashtagRouter = require('./routes/hashtag');
const app = express();

dotenv.config();
db.sequelize.sync();
passportConfig();

if (prod) {
  app.use(helmet());
  app.use(hpp());
  app.use(morgan('combined'));
  app.use(cors({
    origin: 'http://vue.nodebird.com',
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: 'http://localhost:3081',
    credentials: true,
  }));
}

app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: prod,
    domain: prod && '.nodebird.com',
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
app.use('/hashtag', hashtagRouter);

app.listen(prod ? process.env.PORT : 3085, () => {
  console.log(`백엔드 서버 ${prod ? process.env.PORT : 3085}번 포트에서 작동중.`);
});

if (prod) {
  const lex = require('greenlock-express').create({
    version: 'draft-11',
    configDir: '/etc/letsencrypt', // 또는 ~/letsencrypt/etc
    server: 'https://acme-v02.api.letsencrypt.org/directory',
    email: 'zerohch0@gmail.com',
    store: require('greenlock-store-fs'),
    approveDomains: (opts, certs, cb) => {
      if (certs) {
        opts.domains = ['api.nodebird.com'];
      } else {
        opts.email = 'zerohch0@gmail.com';
        opts.agreeTos = true;
      }
      cb(null, { options: opts, certs });
    },
    renewWithin: 81 * 24 * 60 * 60 * 1000,
    renewBy: 80 * 24 * 60 * 60 * 1000,
  });
  https.createServer(lex.httpsOptions, lex.middleware(app)).listen(443);
  http.createServer(lex.middleware(require('redirect-https')())).listen(80);
} else {
  app.listen(prod ? process.env.PORT : 3085, () => {
    console.log(`server is running on ${process.env.PORT}`);
  });
}
