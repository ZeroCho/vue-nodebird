module.exports = {
  head: {
    title: 'NodeBird',
  },
  modules: [
    '@nuxtjs/axios',
  ],
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  vuetify: {},
  axios: {
    browserBaseURL: 'http://localhost:3085',
    baseURL: 'http://localhost:3085',
    https: false,
  },
  server: {
    port: 3081,
  },
};
