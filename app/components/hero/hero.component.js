import template from './hero.html';
import controller from './hero.controller';

let heroComponent = function () {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'heroCtrl',
    bindToController: true
  };
};

export default heroComponent;
