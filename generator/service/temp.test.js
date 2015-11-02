import <%= upCaseName %>Module from './<%= name %>'
import <%= upCaseName %>Service from './<%= name %>.service';

describe('<%= upCaseName %>', () => {
  let $rootScope, makeController;

  beforeEach(window.module('app'));

  describe('Service', () => {
    // component/directive specs
    let service = <%= upCaseName %>Service();

    it('has property name' ,() => {
      expect(service).to.have.property('name');
    });

  });
});
