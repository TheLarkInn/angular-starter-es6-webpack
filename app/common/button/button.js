import buttonComponent from './button.component';

export default app => {
  app.directive('button', buttonComponent);

  if (ENVIRONMENT === 'test') {
    require('./button.test.js');
  }
}
