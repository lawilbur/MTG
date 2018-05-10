const app = angular.module("myApp", []);

app.controller("MainController", ["$http", function($http){

	this.cardTitle='';
	this.returnedCards=[];
	this.deckArray = [];

	this.searchCards = () =>{
		$http({
			method: "GET",
			url: "https://api.magicthegathering.io/v1/cards?pageSize=52&contains=imageUrl&name="+ this.cardTitle,
			Headers: {
				Accept: 'application/json'
			}
		}).then((response) =>{
			console.log(response.data.cards);
			this.returnedCards = response.data.cards
		}, (error) => {
			console.log(error);
		}).catch((err) => console.log('Catch: ', err));
	}

	this.addToDeck = (id) => {

	}

	// this.searchCards();
}]);
