import React from 'react';
import Result from './result.js';
import Saved from './saved.js';
import axios from 'axios';

class Search extends React.Component{

	constructor(){
		super();

		this.state={
			topic: '',
			start: undefined,
			end: undefined,
		};
	}


	_handleSubmit(event){
		event.preventDefault();

		this.setState({
			topic: event.target.topic.value,
			start: event.target.startDate.value,
			end: event.target.endDate.value
		}, ()=>{
			console.log('state',this.state);
		});
		
		console.log(event.target.startDate.value);
	}


	render(){
		return(
			
			<div>
				<section id='search'>
					<h3>Search</h3>

					<form onSubmit={this._handleSubmit.bind(this)}>
						<label>
							<p>Topic:</p><br />
							<input 
								type="text" 
								name="topic" 
							/><br />
						</label>

						<label>
							<p>Start Year:</p><br />
							<input 
								className='dateForm' 
								type="date" 
								name="startDate" 
							/><br />
						</label>

						<label>
							<p>End Year:</p><br />
							<input 
								className='dateForm' 
								type="date" 
								name="endDate" 
							/><br />
						</label>

						<input className='btn submit' type="submit" value="Submit" />
					</form>

				</section>

				<Result searched={this.state.topic} />
				<Saved />
			</div>
		);
	}
} //end of class

export default Search;