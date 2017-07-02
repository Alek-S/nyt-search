import React from 'react';
import Search from './children/search.js';

class Main extends React.Component{
	render(){
		return(
			<div>
				<header>
					<h1> <img src="assets/images/logo.svg" alt="logo" height="40px"/> New York Times Article Search</h1>
					<h2> Search for and annotate articles of interest.</h2>

					<a href="https://github.com/Alek-S/Scrapeosaurus" id="github">GitHub <img src="assets/images/external-link.svg" alt="link" height="10px" /></a>
				</header>

				<Search />
			</div>
		);
	}
}

export default Main;