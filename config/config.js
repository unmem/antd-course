export default {
  singular: true, // model and page folder
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        locale: {
          enable: true,
        },
      },
    ],
  ],
  routes: [
    {
      path: '/',
      component: '../layout',
      routes: [
        { path: '/', component: 'HelloWorld' },
        { path: 'helloworld', component: 'HelloWorld' },
        {
          path: 'dashboard',
          routes: [
            { path: 'analysis', component: 'Dashboard/Analysis' },
            { path: 'monitor', component: 'Dashboard/Monitor' },
            { path: 'workplace', component: 'Dashboard/Workplace' },
          ],
        },
        { path: 'puzzlecards', component: 'puzzlecards' },
        { path: 'list', component: 'list' },
      ],
    },
  ],
  proxy: {
    '/dev': {
      target: 'http://localhost:8081',
      changeOrigin: true,
    },
  },
}
