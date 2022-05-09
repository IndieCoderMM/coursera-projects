(function () {
'use strict';

angular.module('MoviesDBApp', [])
.controller('SearchEngineController', SearchEngineController)
.service('MovieSearchService', MovieSearchService)
// .directive('foundItems', FoundItems)
.constant('ApiBasePath', "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json");

SearchEngineController.$inject = ['MovieSearchService'];
function SearchEngineController (MovieSearchService) {
	var menu = this;
	menu.searchTerm = "";
	menu.movies = [];
	
	menu.getMovies = function () {
		if (menu.searchTerm.length == 0) {
			alert("Enter your search term!")
			return
		}
		var promise = MovieSearchService.getMatchedMenuItems(menu.searchTerm);
		promise.then(function(response) {
			menu.movies = response;
			menu.header = menu.movies.length + " Movies containing " + menu.searchTerm;
			// console.log(menu.movies);
		})
		.catch(error => console.log("Something went wrong!", error));


	};
	menu.hideItem = function(index) {
		menu.movies.splice(index, 1);
		menu.header = menu.movies.length + " Movies containing " + menu.searchTerm;
	}
}

MovieSearchService.$inject = ['$http', 'ApiBasePath'];
function MovieSearchService($http, ApiBasePath) {
	var service = this;

	service.getMatchedMenuItems = function (searchTerm) {
		searchTerm = searchTerm.toLowerCase()
		return $http({
			method: "GET",
			url: (ApiBasePath)
		})
		.then(function (result) {
			var moviesList = result.data
			var foundMovies = [];
			console.log(moviesList)
			for (let x in moviesList) {
				if (moviesList[x].title.toLowerCase().includes(searchTerm)) {
					let movie = {
						title: moviesList[x].title,
						year: moviesList[x].year,
						genre: moviesList[x].genres[0] || '',
					}
					foundMovies.push(movie);
				}
			}
			return foundMovies;
		})
	};
}
})();