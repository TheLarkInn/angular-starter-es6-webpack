import template from './button.html';
import controller from './button.controller';

let buttonComponent = function () {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'buttonCtrl',
    bindToController: true
  };
};

export default buttonComponent;
