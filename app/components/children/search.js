import React from 'react';
import Result from './result.js';
import axios from 'axios';

class Search extends React.Component{

	constructor(){
		super();

		this.state={
			topic: '',
			start: undefined,
			end: undefined,
			results: undefined,
		};
	}

	//Custom handler for when submit button is pressed
	_handleSubmit(event){
		event.preventDefault();

		//save form entries to states
		this.setState({
			topic: event.target.topic.value.trim(),
			start: parseInt(event.target.startDate.value),
			end: parseInt(event.target.endDate.value.trim())
		}, ()=>{

			if(this.state.topic.length > 0){
				const apiKey = 'f4c5492098e245379b36710a637e455a';
				const query = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' +
									apiKey + '&q='+ this.state.topic + '&fl=web_url,headline,pub_date';
				console.log(query);

				//query nyt for articles
				axios({
					method: 'get',
					url: query,

				}).then( (reply)=> {
					//save NYT response to this.state.result --  "reply.data.response.docs"
					this.setState({
						results: reply.data.response.docs
					});
				});
			}
		});
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
								required
							/><br />
						</label>

						<label>
							<p>Start Year:</p><br />
							<input 
								className='dateForm' 
								type="number" min="1851" max={new Date().getFullYear()} step="1" placeholder="2016"
								name="startDate" 
								required
							/><br />
						</label>

						<label>
							<p>End Year:</p><br />
							<input 
								className='dateForm' 
								type="number" min="1851" max={new Date().getFullYear()} step="1" placeholder="2017"
								name="endDate" 
								required
							/><br />
						</label>

						<input className='btn submit' type="submit" value="Submit" />
					</form>

				</section>

				<Result searched={this.state.results} />
			</div>
		);
	}
} //end of class

export default Search;