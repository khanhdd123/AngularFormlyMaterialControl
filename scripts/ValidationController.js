(function(){
  'use strict';
  var app = angular.module('validationApp',['formly','formlyBootstrap','ngMaterial','am.date-picker']);
  app.config(['amDatePickerConfigProvider', function(amDatePickerConfigProvider) {
        amDatePickerConfigProvider.setOptions({
          popupDateFormat: 'Do of MMMM',
          calendarIcon: './bower_components/am-date-picker-master/src/img/icons/ic_today_24px.svg',
          clearIcon: './bower_components/am-date-picker-master/src/img/icons/ic_close_24px.svg',
          nextIcon: './bower_components/am-date-picker-master/src/img/icons/ic_chevron_right_18px.svg',
          prevIcon: './bower_components/am-date-picker-master/src/img/icons/ic_chevron_left_18px.svg'
            })
    }]);
  app.run(function(formlyConfig){
    formlyConfig.setType({
      name: 'input',
      template: '<input ng-model="model[options.key]">'
    });

    formlyConfig.setWrapper({
      name: 'mdLabel',
      types: ['input'],
      template: '<label>{{to.label}}</label><formly-transclude></formly-transclude>'
    });

    formlyConfig.setWrapper({
      name: 'mdInputContainer',
      types: ['input'],
      template: '<md-input-container class = "md-block"><formly-transclude></formly-transclude><div ng-if="options.validation.errorExistsAndShouldBeVisible" ng-messages="options.formControl.$error"><div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">{{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}</div></div></md-input-container>'
    });

    formlyConfig.setType({
      name : 'datepicker',
      templateUrl : 'datepicker.html'
    });

    formlyConfig.setWrapper({
      name : 'test',
      types : ['datepicker'],
      template : '<formly-transclude></formly-transclude><div ng-if="options.validation.errorExistsAndShouldBeVisible" ng-messages="options.formControl.$error"><div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">{{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}</div></div>'
    });

  });
  app.controller('ValidationController',function(){
    var vm = this;
    var columnDefs = [
      {
        name : 'State',
        field : 'name'
      },
      {
        name : 'Abbr',
        field : 'abbr'
      }
    ];
    vm.model = {
    };
    vm.options = {
      formState: {
        uiGridCtrl: function ($scope) {
          $scope.to.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
          };
        }
      }
    };
    vm.fields = [
      {
        key : 'test',
        type : 'input',
        templateOptions : {
          label : 'Label'
        }
      },
      {
        key : 'test2',
        type : 'datepicker',
        templateOptions : {
          label : 'Date',
          required : true
        },
        validation : {
          messages: {
            required: function(viewValue, modelValue, scope) {
              return scope.to.label + ' is required'
            }
          }
        }
      }
    ];
  });
}());