(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController ($scope) {
	$scope.message = "";
	$scope.lunchString = "";
	$scope.items = 0;

	$scope.checkItems = function () {
		var lunchItems = $scope.lunchString.split(',');
		lunchItems = removeSpaces(lunchItems);
		$scope.items = lunchItems.length;

		if ($scope.items == 0 ) {
			$scope.message = "Please enter data first!";
		}
		else if ($scope.items < 4) {
			$scope.message = "Enjoy!";
		}
		else {
			$scope.message = "Too Much!";
		}
	};

	function removeSpaces (arr) {
		console.log(arr);
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == null || arr[i].trim() == "") {
				arr.splice(i, 1);
			} 
		}
		return arr;
	}
}

})();