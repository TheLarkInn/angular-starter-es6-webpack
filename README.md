# angular-starter-es6-webpack
This is an Angular Starter App with component and service generators using gulp for easy component development. Uses Karma-Mocha-Chai as test sweet and Babel Loader and Webpack for ES6

## Instructions for Use
1. Fork and Clone Repository.
2. Open terminal and `cd` to path of the repo.
3. Install any node modules: `npm install`
4. Install gulp: `npm install gulp -g`
5. Run the App: `npm run dev`
6. Go to localhost:9000


## Generators
This app comes with some helpful and generators for creating a new component/service. You simply have to hook them up to your components.js and services.js file.

### To create a new component:
` gulp component --name <NAME_OF_YOUR_COMPONENT> `

### To create a new common component:

` gulp common_component --name <NAME_OF_YOUR_COMPONENT> `

### To create a new service

` gulp service --name <<NAME_OF_YOUR_SERVICE> `