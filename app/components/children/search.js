import React from 'react';

class Search extends React.Component{

	constructor(props){
		super(props);
	}


	_handleSubmit(){
		event.preventDefault();
	}


	render(){
		return(
			<section id='search'>
				<h3>Search</h3>

				<form onSubmit={this._handleSubmit.bind(this)}>
					<label>
						<p>Topic:</p><br />
						<input type="text" name="topic" /><br />
					</label>

					<label>
						<p>Start Year:</p><br />
						<input className='dateForm' type="date" name="start" /><br />
					</label>

					<label>
						<p>End Year:</p><br />
						<input className='dateForm' type="date" name="end" /><br />
					</label>

					<input className='btn submit' type="submit" value="Submit" />
				</form>
			</section>
		);
	}
} //end of class

export default Search;