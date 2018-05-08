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

class App extends React.Component {
	render () {
		return (
			<div>
				<Navbar/>
				<h1>MTG Search Tool</h1>

			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.querySelector('.container')
);
