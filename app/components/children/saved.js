import React from 'react';
import axios from 'axios';

class Saved extends React.Component{

	constructor(){
		super();

		this.state={
			savedArticles: [],
			value: ''
		};
	}

	//before render
	componentWillMount(){
		this._getarticles();
	}

	// componentDidMount(){
	// 	//polling
	// 	this._timer = setInterval( ()=>{
	// 		this._getarticles();
	// 	}, 7000 );
	// }

	// componentWillUnmount(){
	// 	clearInterval( this._timer);
	// }
	componentWillReceiveProps(){
		this._getarticles();
	}


	_getarticles(){
		axios.get( window.location.origin + '/api/saved').then((response)=>{
			this.setState({
				savedArticles: response.data
			});
		});
	}

	_deleteArticle(event){
		event.preventDefault();

		//delete selected article of mongo
		axios({
			method: 'delete',
			url:  window.location.origin + '/api/saved',
			data: {
				url: this.article.url
			}
		}).then( (response)=>{
			console.log(response.data);
			this.callback();
		});
	}

	_handleChange(event){
		event.preventDefault();
		this.value = event.target.value;
	}


	_getComments(article){
		//url of story, and index of comment array - used to bind to _deleteComment
		let toDelete = (url, commentIndex)=>{
			return {
				url:url, 
				commentIndex: commentIndex, 
				getArticles: this._getarticles.bind(this)};
		};

		return article.comments.map((comment, index)=>{
			return(
				<p className='comment' value={index}>
					{comment}
					<button className='btn' onClick={ this._deleteComment.bind( toDelete(article.url, index)) }>x</button>
				</p>
			);
		});
	}

	_addComment(event){
		// event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		
		axios({
			method: 'post',
			url:  window.location.origin + '/api/comment',
			data: {
				url: this.article.url,
				comment: this.article.value
			}
		}).then( (response)=>{
			console.log(response.data);
			this.callback();
		});
	}

	_deleteComment(event){
		event.preventDefault();

		//article url: this.url
		//comment index: this.commentIndex
		axios({
			method: 'delete',
			url:  window.location.origin + '/api/comment',
			data: {
				url: this.url,
				position: this.commentIndex
			}
		}).then( (response)=>{
			console.log(response.data);
			this.getArticles();
		});

	}
	
	_showSaved(){

		let toBind = (article, callback)=>{
			return {article, callback};
		};

		return this.state.savedArticles.map( (article)=>{

			return(
				<div className='resultSection'><strong>Headline: </strong>{article.title}
					<button className='btn' onClick={ this._deleteArticle.bind( toBind(article, this._getarticles.bind(this) ) ) }>x</button>
					<br /><strong> Published: </strong>{article.date.slice(0,10)}
					<br /><a href={article.url}>Article Link</a>

					<div className='commentsSection'>{this._getComments(article)}</div>

					<form onSubmit={ this._addComment.bind( toBind(article, this._getarticles) ) }>
						<input 
							className='commentForm' 
							type="test" placeholder="Add new comment"
							value={article.value} onChange={this._handleChange.bind(article)}
							required
						/><br />
						<button className='addComment' >Add Comment</button>
					</form>

				</div> 
			);
		});

	}

	render(){
		return(
			<section id='saved'>
				<h3>Saved</h3>
				{this._showSaved()}
			</section>
		);
	}
} //end of class

export default Saved;