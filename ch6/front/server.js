const { Nuxt, Builder } = require('nuxt');

const app = require('express')();
const isProd = (process.env.NODE_ENV === 'production');
const port = process.env.PORT || 3081;

// We instantiate Nuxt.js with the options
const config = require('./nuxt.config.js');
config.dev = !isProd;
const nuxt = new Nuxt(config);

// Render every route with Nuxt.js
app.use(nuxt.render);

// Build only in dev mode with hot-reloading
if (config.dev) {
  new Builder(nuxt).build()
    .then(listen);
} else {
  listen();
}

function listen() {
  // Listen the server
  app.listen(port);
  console.log('Server listening on `localhost:' + port + '`.');
}
