import <%= name %>Component from './<%= name %>.component';

export default app => {
  app.directive('<%= name %>', <%= name %>Component);

  if (ENVIRONMENT === 'test') {
    require('./<%= name %>.test.js');
  }
}
