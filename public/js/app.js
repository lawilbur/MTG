const app = angular.module("myApp", []);

app.controller("MainController", ["$http", function($http){

	this.cardTitle='';
	this.returnedCards=[];
	this.fetchedDeckArray = [];
	this.loginData = {};
	this.signUpData = {};
	this.editData = {};
	this.currentUser = "";
	this.currentUserId = 0;
	this.loggedIn = false;
	this.loggedOut = true;
	this.createDeck = true;
	this.deckCreateData = {};

	this.includePath = 'partials/home.html';
	this.changeInclude = (path) => {
		this.includePath = 'partials/' + path + '.html';
	};

	this.loggedInChange = () =>{
		this.loggedIn = !this.loggedIn;
		this.loggedOut = !this.loggedOut;
	}

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

	this.cardsToBeAdded = [];
	this.viewingAdded = true;
	this.viewingDeck = false;
	this.showDeckCards =[];

	this.switchDeckAddedView = () =>{
		this.viewingDeck = !this.viewingDeck;
		this.viewingAdded = !this.viewingAdded;
	}
	this.addToProfile = (id) =>{
		console.log(id);
		if(this.currentUserId === 0) {
			alert("You must be logged in to add a card")
		} else {
			this.cardsToBeAdded.push(this.returnedCards[id])
		 	this.returnedCards.splice(id, 1);
		}
	}
	this.addADeck = () =>{

	}
	this.addToDeck = () => {
		console.log("add to Deck function");
		$http({
			method: "POST",
			url: "/deck",
			data: {
				name: this.deckCreateData.name,
				user_id: this.currentUserId,
				cards: this.cardsToBeAdded
			}
		}).then((response) => {
			this.cardsToBeAdded = [];
			this.getDecks();
		}, (err) =>{
			console.log(err);
		}).catch((err) => console.log(err));
	}


	this.showDeck = (id) =>{
		this.showDeckCards = [];
		// console.log(this.fetchedDeckArray[id]);
		for(let i=0; i<this.fetchedDeckArray[id].cards.length; i++){
			console.log(this.fetchedDeckArray[id].cards[i]);
			this.showDeckCards.push(this.fetchedDeckArray[id].cards[i])
		}
		if(this.viewingDeck !== true){
			this.viewingDeck = !this.viewingDeck;
			this.viewingAdded = !this.viewingAdded;
		}
	}

	this.getDecks = () =>{
		console.log(this.currentUserId);
		this.fetchedDeckArray = [];
		$http({
			method: "GET",
			url: "/deck/" + this.currentUserId,
		}).then((response) => {
			for(let i=0; i<response.data.length; i++){
				this.fetchedDeckArray.push(response.data[i]);
			}
		}, (err) =>{
			console.log(err);
		}).catch((err) => console.log(err));
	}

	this.clearAll = () =>{
		this.cardTitle='';
		this.returnedCards=[];
		this.fetchedDeckArray = [];
		this.loginData = {};
		this.signUpData = {};
		this.editData = {};
		this.currentUser = "";
		this.currentUserId = 0;
		this.loggedIn = false;
		this.loggedOut = true;
		this.changeInclude('home');
		this.cardsToBeAdded = [];
		this.viewingAdded = true;
		this.viewingDeck = false;
		this.showDeckCards =[];
	}

	this.loginError = false;
	this.loginErrorMessage = "";

	this.login = () => {
		// console.log(this.signUpData);
		$http({
			method: "POST",
			url: "/user/login",
			data: this.loginData
		}).then((response) => {
				console.log(response);
				this.currentUser = response.data[0].username;
				this.currentUserId = response.data[0].id;
				this.loginData={};
				this.changeInclude('profile');
				this.loginError = false;
				this.loginErrorMessage = "";
				this.loggedInChange();
		}, (err) =>{
			console.log(err.data.message);
			this.loginError = true;
			this.loginErrorMessage = err.data.message;
		}).catch((err) => console.log(err));
	}

	this.signUp = () => {
		// console.log(this.signUpData);
		$http({
			method: "POST",
			url: "/user/signup",
			data: this.signUpData
		}).then((response) => {
			console.log(response);
			this.signUpData={};
			this.changeInclude('login');
		}, (err) =>{
			console.log(err);
		}).catch((err) => console.log(err));
	}

	this.deleteAccount = () =>{
		console.log(this.currentUserId);
		$http({
			method: "DELETE",
			url:"/user/"+ this.currentUserId,
		}).then((response) =>{
			alert("Account Deleted")
		}, (error) => {
			console.log(error);
		}).catch((err) => console.log('Catch: ', err));
		this.includePath = 'partials/home.html';
		this.loggedInChange();
		this.currentUser = "";
		this.currentUserId = 0;

	}

	this.updateAccount = () =>{
		console.log(this.currentUserId);
		$http({
			method: "PUT",
			url:"/user/"+ this.currentUserId,
			data: this.editData,
		}).then((response) =>{
			this.editData = {};
			this.currentUser = response.data[0].username
		}, (error) => {
			console.log(error);
		}).catch((err) => console.log('Catch: ', err));
		this.includePath = 'partials/profile.html';

	}
	// this.searchCards();
}]);
