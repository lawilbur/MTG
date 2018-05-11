const app = angular.module("myApp", []);

app.controller("MainController", ["$http", function($http){

	this.cardTitle='';
	this.returnedCards=[];
	this.deckArray = [];
	this.loginData = {};
	this.signUpData = {};
	this.editData = {};
	this.currentUser = "";
	this.currentUserId = 0;
	this.loggedIn = false;
	this.loggedOut = true;

	this.includePath = 'partials/home.html';
	this.changeInclude = (path) => {
		this.includePath = 'partials/' + path + '.html';
	};

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


	this.addToDeck = (id) => {

	}

	this.getDecks = () =>{

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

	// this.searchCards();
}]);
