import React from 'react';

class Result extends React.Component{
	constructor(){
		super();
	}

	render(){
		let articles = this.props.searched;
		if(articles){
			console.log(articles[0].headline.main);
		}
		
		return(
			<section id='result'>
				<h3>Results</h3>
				<p></p>
			</section>
		);
	}
} //end of class

export default Result;