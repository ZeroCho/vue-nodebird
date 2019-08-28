module.exports = {
  modules: [
    '@nuxtjs/axios',
  ],
  devModules: [
    '@nuxtjs/vuetify',
  ],
  vuetify: {

  },
  axios: {
    browserBaseURL: 'http://localhost:3085',
    baseURL: 'http://localhost:3085',
    https: false,
  }
};
