var React = require('react');

var AddNote = React.createClass({
	propTypes:{

		username: React.PropTypes.string.isRequired,
		addNote: React.PropTypes.func.isRequired
	},
	// this is just a function created to reference the input box content
	// for more information see this: https://facebook.github.io/react/docs/more-about-refs.html
	setRef: function(ref){

		this.note = ref; 
	},

	handleSubmit: function(){
		//prevent adding empty string
		if (this.note.value !== ""){
			var newNote = this.note.value;
			this.note.value = '';
			this.props.addNote(newNote); 
		}
		else{

			console.log("you can add empty string")
		}

	},
	//add this method so that submit can be done by press enter key as well.
	_handleKeyPress: function(e) {
	    if (e.key === 'Enter') {
	      this.handleSubmit();
	    }
  	},

	render: function(){
		// create a ref attribute for the input tag and tie this to this.note, which is some random name created for the React class, you can call it notee and it will still work. ref is like a reference to the input box content. 
		return(
			<div className = "input-group">
				<input type= "text" className = "form-control" placeholder="Add New Note" ref={this.setRef} onKeyPress={this._handleKeyPress}/>
				<span className="input-group-btn">
					<button className="btn btn-defalut" type="button" onClick={this.handleSubmit}> Submit </button>
				</span>
			</div>
		)
	}

});

module.exports = AddNote;