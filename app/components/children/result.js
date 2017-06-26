import React from 'react';

class Result extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<section id='result'>
				<h3>Results</h3>
				<p> {console.log(this.props.searched)} </p>
			</section>
		);
	}
} //end of class

export default Result;