(function () {
    'use strict';

    angular.module('fs-angular-password',['fs-angular-modal','fs-angular-validate','fs-angular-util'])
    .directive('fsPassword', function($timeout, fsPassword, fsUtil) {
        return {
			templateUrl: 'views/directives/password.html',
			restrict: 'E',
			replace: false,
			scope: {
				password: '=fsModel'
			},
			controller: function($scope) {

				$scope.validations = fsPassword.options().validations;

				$scope.compare = function(compare) {
					if($scope.passwordElement.val()!=compare)
						return 'These passwords don\'t match. Try again?';

					return true;
				}

				$scope.names = { 	password: 'password_' +fsUtil.guid(),
									password_confirm: 'password_confirm_' +fsUtil.guid() };
			},
	    	link: function($scope, element) {

	    		$scope.passwordElement = angular.element(element[0].querySelector('input[name="password"]'));
	    		$scope.passwordConfirmElement = angular.element(element[0].querySelector('input[name="password_confirm"]'));
	    		$scope.passwordConfirmElement.data('scope',$scope);

	    		$timeout(function() {
	    			angular.element(element[0].querySelectorAll('.password input,.password-confirm input'))
	    				.on('focus',function() {
	    					angular.element(this).removeAttr('readonly'); //tricks Chrome to think its readonly and not autofill
	    				})
	    				.attr('type','password')
	    				.val('') //removes yellow autofill background
	    				.focus();
	    		},500);
	    	}
	    }
    })

})();