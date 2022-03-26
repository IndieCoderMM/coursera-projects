(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	var list = this;

	list.items = ShoppingListCheckOffService.getToBuyItems();

	list.buyItem = function (itemIndex) {
		ShoppingListCheckOffService.buyItem(itemIndex);
		console.log(list.items);
	};
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var list = this;

	list.items = ShoppingListCheckOffService.getBoughtItems();

}

// ShoppingListCheckOffService.$inject = [];
function ShoppingListCheckOffService () {
	var service = this;

	var toBuyItems = [
		{ name: "Books", quantity: 3 },
		{ name: "Lego", quantity: 10 },
		{ name: "Pencils", quantity: 5},
		{ name: "Cookies", quantity: 50 }
	];

	var boughtItems = [
	];

	service.getToBuyItems = function () {
		return toBuyItems;
	};

	service.getBoughtItems = function () {
		return boughtItems;
	};

	service.buyItem = function (index) {
		var item = toBuyItems[index];
		boughtItems.push(item);
		toBuyItems.splice(index, 1);
	};
}
})();