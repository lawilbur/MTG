const app = angular.module("myApp", []);

app.controller("MainController", ["$http", function($http){

	this.cardTitle='';
	this.returnedCards=[];
	this.deckArray = [];
	this.loginData = {};
	this.signUpData = {};


	this.includePath = 'partials/home.html';
	this.changeInclude = (path) => {
		this.includePath = 'partials/' + path + '.html';
	};

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

	this.getDecks = () =>{

	}

	this.signUp = (item) => {
		console.log(this.signUpData);
		$http({
			method: "POST",
			url: "/user",
			data: this.signUpData
		}).then((response) => {
			this.signUpData={};
			this.changeInclude('login');
		}, (err) =>{
			console.log(err);
		}).catch((err) => console.log(err));
	}

	// this.searchCards();
}]);
