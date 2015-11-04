# angular-starter-es6-webpack 
[![Join the chat at https://gitter.im/angularclass/NG6-starter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/thelarkinn/angular-starter-es6-webpack?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


This is an Angular Starter App with component and service generators using gulp for easy component development. Uses Karma-Mocha-Chai as test suit and Babel Loader and Webpack for ES6

## Instructions for Installation
1. Fork and Clone Repository.
2. Open terminal and `cd` to path of the repo.
3. Install any node modules: `npm install`
4. Install gulp: `npm install gulp -g`

## Running the Enviornments
### Development
` npm run dev `

### Test (Karma-Mocha-Chai)
` npm run test `

### Production
` npm run build `


## Generators
This app comes with some helpful and generators for creating a new component/service. You simply have to hook them up to your components.js and services.js file.

### To create a new component:
` gulp component --name <NAME_OF_YOUR_COMPONENT> `

### To create a new common component:

` gulp common_component --name <NAME_OF_YOUR_COMPONENT> `

### To create a new service

` gulp service --name <NAME_OF_YOUR_SERVICE> `


##Project Structure

```
/app
  /assets
    /images
      /foo.png
  /common
    /button
      /button.js
      /button.component.js
      /button.controller.js
      /button.html
      /button.scss
      /button.test.js
    /navbar/
    /components.js
  /components
    /about
      /about.js
      /about.component.js
      /about.controller.js
      /about.html
      /about.scss
      /about.test.js
    /home/
    /components.js
  /services
    /users
      /users.js
      /users.service.js
      /users.test.js
    /documents/
    /services.js
  /app.config.js
  /index.js
  /index.html
  /index.scss
```

### Main/Entry File To the Project
`index.js` is the main entry file which serves as the total include point for all of your components, services, assets, and styles. 

Notice that throughout the project, that the angular setter/getter is called once, and is assigned to a constant which is passed through each of the dependancy trees so that it is exposed to the rest of the imported/exported components. 

_Why?_ Because this makes your components more *modular*, allowing whatever `angular.module` object to be assigned to the exported component/component set.

```javascript
// index.js
// Angular & Router ES6 Imports
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';
import appComponents from './components/components.js';
import commonComponents from './common/components.js';
import appServices from './services/services.js';
import appConfiguration from './app.config';

// Single Style Entry Point
import './index.scss';

if (ENVIRONMENT === 'test') {
  console.log('ENV:', ENVIRONMENT);
  require('angular-mocks/angular-mocks');
}

const app = angular.module('app', ['ui.router']);

// Components Entrypoint
appComponents(app);

// Common Components Entrypoint
commonComponents(app);

// App Services Entrypoint
appServices(app);

// Router Configuration
// Components must be declared first since
// Routes reference controllers that will be bound to route templates.
// appConfiguration(app);

```

### 