(function(){
  'use strict';
  var app = angular.module('testApp',['formly','formlyBootstrap']);
  app.config(function(formlyConfigProvider){
    formlyConfigProvider.setWrapper({
      name : 'bootstrapLabel',
      templateUrl : 'label-wrapper.html'
    });

    formlyConfigProvider.setWrapper({
      name : 'bootstrapLabelFull',
      templateUrl : 'label-wrapper-full.html'
    });
    formlyConfigProvider.setType({
      name : 'input',
      templateUrl : 'input-template.html',
      wrapper : ['bootstrapLabel','bootstrapHasError'],
      overwriteOk : true
    }); 
    formlyConfigProvider.setType({
      name : 'inputfull',
      templateUrl : 'input-template.html',
      wrapper : ['bootstrapLabelFull','bootstrapHasError'],
      overwriteOk : true
    });
    formlyConfigProvider.setType({
      name : 'radio',
      templateUrl : 'radio-template.html'
    });
  });
  app.run(function(formlyConfig){
    formlyConfig.disableWarnings = window.onProd;
  });
  app.controller('ValidationController',function(){
    var vm = this;
    vm.model = {};
    vm.options = {
      formState : {
        horizontalLabelClass: 'col-xs-6',
        horizontalFieldClass: 'col-xs-6',
        horizontalLabelFullClass : 'col-xs-3',
        horizontalFieldFullClass : 'col-xs-9'
      }
    };
    vm.fields = [
      {
        className : 'row',
        fieldGroup : [
          {
              className : 'col-xs-6',
              key : 'khcb',
              type : 'radio',
              templateOptions : {
                label : 'La khach hang cua CB',
                options : [
                  {
                    name : 'Khong',
                    value : 'no'
                  },
                  {
                    name : 'Co',
                    value : 'yes'
                  }
                ]
              }
          }
        ]
      },
      {
        className : 'row',
        fieldGroup : [
          {
            className : 'col-xs-6',
            key : 'macif',
            type : 'input',
            templateOptions : {
              label : 'Ma CIF',
              placeholder : 'Nhap ma CIF neu co'
            }
          },
          {
            className : 'col-xs-6',
            key : 'vncb',
            type : 'radio',
            templateOptions : {
              label : 'Can bo nhan vien CBBank',
              options : [
                {
                  name : 'Khong',
                  value : 'no'
                },
                {
                  name : 'Co',
                  value : 'yes'
                }
              ]
            }
          }
        ]
      },
      {
        className : 'row',
        fieldGroup : [
          {
            className : 'col-xs-6',
            key : 'name',
            type : 'input',
            templateOptions : {
              label : 'Ho va ten',
              placeholder : 'Nhap ho ten'
            }
          },
          {
            className : 'col-xs-6',
            key : 'dateOfBirth',
            type : 'input',
            templateOptions : {
              label : 'Ngay sinh',
              placeholder : 'DD/MM/YYYY'
            }
          }
        ]
      },
      {
        className : 'row',
        fieldGroup : [
          {
            className : 'col-xs-6',
            key : 'sex',
            type : 'radio',
            templateOptions : {
              label : 'Gioi tinh',
              options : [
                {
                  name : 'Nam',
                  value : 'boy'
                },
                {
                  name : 'Nu',
                  value : 'girl'
                }
              ]
            }
          }
        ]

      },
      {
        className : 'row',
        fieldGroup : [
          {
            className : 'col-xs-6',
            key : 'cmnd',
            type : 'input',
            templateOptions : {
              label : 'So CMND/Ho chieu',
              placeholder : 'Nhap so'
            }
          },
          {
            className : 'col-xs-6',
            key : 'ngaycmnd',
            type : 'input',
            templateOptions : {
              label : 'Ngay cap',
              placeholder : 'DD/MM/YYYY'
            }
          }
        ]
      },
      {
        className : 'row',
        fieldGroup : [
          {
            className : 'col-xs-6',
            key : 'noicapCMND',
            type : 'select',
            templateOptions : {
              label : 'Noi cap'
            }
          }
        ]
      },
      {
        className : 'row',
        fieldGroup : [
          {
            className : 'col-xs-6',
            key : 'address',
            type : 'input',
            templateOptions : {
              label : 'Dia chi HKTT',
              placeholder : 'Nhap dia chi...'
            }
          }
        ]
      },
      {
        className : 'row',
        fieldGroup : [
          {
            className : 'col-xs-6',
            key : 'tinhtp',
            type : 'select',
            templateOptions : {
              label : 'Tinh/thanh pho'
            }
          },
          {
            className : 'col-xs-6',
            key : 'quocgia',
            type : 'input',
            templateOptions : {
              label : 'Quoc gia',
              placeholder : 'Viet Nam'
            }
          }
        ]
      },
      {
        className : 'row',
        fieldGroup : [
          {
            className : 'col-xs-6',
            key : 'dtdd',
            type : 'input',
            templateOptions : {
              label : 'Dien thoai di dong',
              placeholder : 'Nhap so dien thoai di dong'
            }
          },
          {
            className : 'col-xs-6',
            key : 'dtcd',
            type : 'input',
            templateOptions : {
              label : 'Dien thoai co dinh',
              placeholder : 'Nhap so dien thoai co dinh'
            }
          }
        ]
      },
      {
        className : 'row',
        fieldGroup : [
          {
            className : 'col-xs-6',
            key : 'email',
            type : 'input',
            templateOptions : {
              label : 'Email'
            }
          }
        ]
      }
    ];
  });
}());