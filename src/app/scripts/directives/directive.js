(function () {
    'use strict';

    angular.module('fs-angular-password',['fs-angular-modal','fs-angular-validate'])
    .directive('fsPassword', function($location, $timeout) {
        return {

			restrict: 'A',
			replace: false,
	    	link: function($scope, element) {
	    		$timeout(function() { 
	    			angular.element(element[0].querySelectorAll('.password,.password-confirm'))
	    				.attr('type','password')
	    				.val('');
	    		},50);
	    	}
	    }
    })

})();