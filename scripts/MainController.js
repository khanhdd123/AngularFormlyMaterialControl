(function(){
	var app = angular.module('formlyApp',['formly','formlyBootstrap','rzModule','ngMessages']);
	app.config(function($locationProvider,formlyConfigProvider){
		formlyConfigProvider.setType({
      	name : 'input',
      	wrapper : ['test'],
      	templateUrl : 'input-template.html'
    });

    	formlyConfigProvider.setWrapper({
    		name : 'test',
      		template : [
	        	'<div class="formly-template-wrapper form-group"',
          		'ng-class="{\'has-error\': options.validation.errorExistsAndShouldBeVisible}">',
          		'<label for="{{::id}}">{{options.templateOptions.label}} {{options.templateOptions.required ? \'*\' : \'\'}}</label>',
          		'<formly-transclude></formly-transclude>',
          		'<div class="validation"',
          		'ng-if="options.validation.errorExistsAndShouldBeVisible"',
          		'ng-messages="options.formControl.$error">',
          		'<div ng-messages-include="validation.html"></div>',
          		'<div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">',
          		'{{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}',
          		'</div>',
          		'</div>',
          		'</div>'
	      ].join(' ')
	    });
	});
	app.run(function(formlyConfig,formlyValidationMessages) {
	    // single slider type
	    formlyConfig.setType({
	      name: 'slider',
	      template: ['<rzslider rz-slider-model="model[options.key]"' +
	                 ' rz-slider-options="to.sliderOptions"></rzslider>'].join(' '),
	      wrapper: ['bootstrapLabel', 'bootstrapHasError']
	    });

	    //range slider type
	    formlyConfig.setType({
	      name: 'range-slider',
	      template: ['<rzslider rz-slider-model="model[options.key].low"' +
	                 'rz-slider-high="model[options.key].high" ' +
	                 'rz-slider-options="to.sliderOptions"></rzslider>'].join(' '),
	      wrapper: ['bootstrapLabel', 'bootstrapHasError']
	    });
	 });
	app.controller('MainController',MainController);

	function MainController()
	{
		var vm = this;
		vm.rental = {
			hmvay: 0,
			thvay : 0
		};
		vm.sliderData = {
			ceil1 : 100
		};
		vm.rentalFields = [
			{
				className : 'row',
				fieldGroup : [
					{
						className : 'col-xs-5',
						type : 'select',
						key : 'lhvay',
						templateOptions : {
							label : 'Loại hình vay',
							options : [
								{
									name : 'Cho vay BĐS',
									value : 'vayBDS'
								},
								{
									name : 'Cho vay ô tô',
									value : 'vayOto'
								},
								{
									name : 'Cho vay SXKD',
									value : 'vaySXKD'
								},
								{
									name : 'Cho vay Tiêu dùng',
									value : 'vayTD'
								}
							]
						}
					},
					{
						className : 'col-xs-2',
						template : ''
					},
					{
						className : 'col-xs-5',
						type : 'input',
						key : 'mdvay',
						templateOptions : {
							label : 'Mục đích vay',
							placeholder : 'Nhập mục đích vay',
							required : true
						}
					}
				]
			},
			{
				className : 'row'				,
				fieldGroup :  [
					{
						className : 'col-xs-9',
        				key: 'hmvay',
        				type: 'slider',
        				templateOptions: {
          					label: 'Hạn mức vay',
          					sliderOptions: {
            				floor: 0,
            				ceil: vm.sliderData.ceil1
          					}
        				}
      				},
      				{
      					className : 'col-xs-3 khac',
      					key : 'hmvay1',
      					type : 'input',
      					templateOptions : {
      						label : '',
      						required : true,
      						placeholder : 'Nhập hạn mức vay...'
      					},
      					validators : {
      						checkGreater : {
      							expression : function($viewValue,$modelValue,scope)
      							{
      								var value = $viewValue || $modelValue;
      								if(scope.model.lhvay === 'vayBDS')
      								{
      									if(value > vm.sliderData.ceil1)
      									{
      										return false;
      									}
      								}
      								return true;
      							},
      							message : '"is not a valid IP Address"'
      						}
      					},
      					watcher : {
      						listener : function(field,newValue,oldValue,scope,stopWatching)
      						{
      							if(newValue)
      							{
      								scope.model.hmvay = newValue;
      							}
      						}
      					}			
      				}
				]	
			},
			{
				className : 'row',
				fieldGroup : [
					{
						className : 'col-xs-9',
						key : 'thvay',
						type : 'slider',
						templateOptions : {
							label : 'Thời hạn vay',
							sliderOptions : {
								floor : 0,
								translate : function(value)
								{
									return value + 'M';
								}
							}
						},
						expressionProperties : {
							'templateOptions.sliderOptions.ceil' : function($viewValue,$modelValue,scope)
							{
								if(scope.model.lhvay === 'vayBDS')
								{
									return vm.sliderData.ceil1;
								}
								return 3;
							}
						}
					},
					{
						className : 'col-xs-3 khac',
						key : 'thvay',
						type : 'input'
					}
				]
			},
			{
				template : '<center><p><strong>Địa điểm vay</strong></p></center>'
			},
			{
				className : 'row',
				fieldGroup : [
					{
						className : 'col-xs-4',
						key : 'tinhtp',
						type : 'select',
						templateOptions : {
							label : 'Tỉnh/Thành phố'
						}
					},
					{
						className : 'col-xs-4',
						key : 'quanh',
						type : 'select',
						templateOptions : {
							label : 'Quận/Huyện'
						}
					},
					{
						className : 'col-xs-4',
						key : 'tenchnhanh',
						type : 'select',
						templateOptions : {
							label : 'Tên chi nhánh'
						}
					}
				]
			}
		];
	}
}());