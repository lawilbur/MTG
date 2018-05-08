class Navbar extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-dark bg-dark">
				<div className="navbar-nav">
				<a className="nav-item nav-link" href="#">Signup</a>
				</div>
				<form class="form-inline">
  					<input class="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search"></input>
  					<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
				</form>
				<div className="navbar-nav">
				<a className="nav-item nav-link" href="#">Login</a>
				</div>

			</nav>
		)
	}
}
class SearchResults extends React.Component {
	constructor (props) {
		
	}
	getPlayers () {
	fetch('https://api.magicthegathering.io/v1/cards')
	.then(response => response.json())
	.then(data => {
		console.log(data.cards[0]);
	})
	.catch(error => console.log(error));
	}

	render() {
		return (
			<button onClick={()=> this.getPlayers()}>Search</button>
		)
	}


}

class App extends React.Component {
	render () {
		return (
			<div>
				<Navbar/>
				<h1>MTG Search Tool</h1>
				<SearchResults />

			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.querySelector('.container')
);
