import template from './<%= name %>.html';
import controller from './<%= name %>.controller';

let <%= name %>Component = function () {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: '<%= name %>Ctrl',
    bindToController: true
  };
};

export default <%= name %>Component;
