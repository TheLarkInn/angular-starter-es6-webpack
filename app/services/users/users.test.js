import UsersModule from './users'
import UsersService from './users.service';

describe('UsersService', () => {
  let $rootScope, makeController;

  beforeEach(window.module('app'));

  describe('Service', () => {
    // component/directive specs
    let service = UsersService();

    it('has property name' ,() => {
      expect(service).to.have.property('name');
    });

  });
});
