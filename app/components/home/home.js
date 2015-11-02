import homeComponent from './home.component';

export default app => {
  app.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        template: '<home></home>' //Essentially Treats the Home Directive as the Route View.
      });
  }).directive('home', homeComponent);

  if (ENVIRONMENT === 'test') {
    require('./home.test.js');
  }
}
