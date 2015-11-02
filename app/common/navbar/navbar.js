import navbarComponent from './navbar.component';

export default app => {
  app.directive('navbar', navbarComponent);

  if (ENVIRONMENT === 'test') {
    require('./navbar.test.js');
  }
}

