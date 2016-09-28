import React from 'react';

var NotesList = React.createClass({

	render: function(){

		var notes = this.props.notes; 

		// need to convert it to array if the thing pass in is key value pairs; Some data the firebase are array, some are key-value pairs. 
		if (!Array.isArray(notes))
		{
			console.log("this is not an array")
			var out = Object.keys(notes).map(function(key){
				
		        return notes[key];
		    });
		    notes = out; 
		}

		var notes = notes.map(function(note,index){
			return <li className="list-group-item" key={index}>{note}</li>
		})

		return (
			<ul className = "list-group">
				{notes}
			</ul>
		)
	}

});

module.exports = NotesList; 