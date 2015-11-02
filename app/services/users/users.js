import usersService from './users.service';

export default app => {
  app.factory('users', usersService);

  if (ENVIRONMENT === 'test') {
    require('./users.test.js');
  }
}
