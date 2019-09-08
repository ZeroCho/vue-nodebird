module.exports = {
  head: {
    title: 'NodeBird',
    meta: [{
      charset: 'UTF-8',
    }, {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
    }, {
      'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
    }, {
      name: 'description', content: '제로초의 NodeBird SNS',
    }, {
      name: 'og:title', content: 'NodeBird',
    }, {
      name: 'og:description', content: '제로초의 NodeBird SNS',
    }, {
      property: 'og:type', content: 'website',
    }, {
      property: 'og:image', content: 'https://vue.nodebird.com/vue-nodebird.png',
    }],
    link: [
      { rel: 'shortcut icon', href: '/vue-nodebird.png' },
    ],
  },
  modules: [
    '@nuxtjs/axios',
  ],
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
  ],
  vuetify: {},
  moment: {
    locales: ['ko'],
  },
  build: {
    analyze: false,
    extend(config, { isClient }) {
      console.log('webpack', config);
    },
  },
  axios: {
    browserBaseURL: 'http://localhost:3085',
    baseURL: 'http://localhost:3085',
    https: false,
  },
  server: {
    port: 3081,
  },
};
