import React from 'react';
import Search from './children/search.js';

class Main extends React.Component{
	render(){
		return(
			<div>
				<header>
					<h1>New York Times Article Scrubber</h1>
					<h2> Search for and annotate articles of interest.</h2>
				</header>

				<Search />
			</div>
		);
	}
}

export default Main;