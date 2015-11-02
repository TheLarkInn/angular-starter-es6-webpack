import template from './button.html';
import controller from './button.controller';

let buttonComponent = function () {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default buttonComponent;
