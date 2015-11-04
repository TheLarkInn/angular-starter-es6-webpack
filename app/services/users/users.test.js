import UsersModule from './users'
import UsersService from './users.service';

describe('Users', () => {
  let $rootScope, makeController;

  beforeEach(window.module('app'));

  describe('Service', () => {
    // component/directive specs
    let service = UsersService();

    it('has property: name' ,() => {
      expect(service).to.have.property('name');
    });

    it('the name property has the correct value', () => {
      expect(service.name).to.equal('users');
    });
  });
});
