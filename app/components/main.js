import React from 'react';
import Search from './children/search.js';
import Result from './children/result.js';
import Saved from './children/saved.js';

class Main extends React.Component{
	render(){
		return(
			<div>
				<header>
					<h1>New York Times Article Scrubber</h1>
					<h2> Search for and annotate articles of interest.</h2>
				</header>

				<Search />
				<Result />
				<Saved />
			</div>
		);
	}
}

export default Main;