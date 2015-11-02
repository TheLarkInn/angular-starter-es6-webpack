import <%= name %>Service from './<%= name %>.service';

export default app => {
  app.factory('<%= name %>', <%= name %>Service);

  if (ENVIRONMENT === 'test') {
    require('./<%= name %>.test.js');
  }
}
