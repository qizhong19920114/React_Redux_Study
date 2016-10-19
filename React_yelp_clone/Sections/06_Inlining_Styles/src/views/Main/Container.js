// in src/views/Main/Container.js
import React from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react'
import {searchNearby} from 'utils/googleApiHelpers'
import Header from 'components/Header/Header'

import styles from './styles.module.css'

export class Container extends React.Component {
  	//we need to use state to store the places
	constructor(props) {
	    super(props);

	    this.state = {
	      places: [],
	      pagination: null
	    }
	}

  //on Ready is a a prop function that needs to be passed into the Google Map component
  onReady(mapProps, map) {
    const {google} = this.props;
    const opts = {
      location: map.center,
      radius: '500',
      types: ['cafe']
    }
    searchNearby(google, map, opts)
      .then((results, pagination) => {
        // We got some results and a pagination object
        this.setState({
          places: results,
          pagination
        })
      }).catch((status, result) => {
        // There was an error
      })
  }


  render() {
  	//this will return a list of cafe in the map.center area 300 radius; Defined in the opts above 
  	//map.center is not defined so we may got some warnings but the map component will just use the default center
    return (
      	<div>
        	<Map google={this.props.google} onReady={this.onReady.bind(this)} visible={false}>
        	    <Header />
        	    {this.state.places.map(place => {
            		return (<div className={styles.content} key={place.id}>{place.name}</div>)
          		})}

        	</Map>
     	</div>
    )
  }
}


//this is how we wrap the component in the GoogleApiWrapper
export default GoogleApiWrapper({
  apiKey: "AIzaSyB9Uc_MKU2drxUo7urUQgNy7ELtdJtnaLk"
})(Container)
