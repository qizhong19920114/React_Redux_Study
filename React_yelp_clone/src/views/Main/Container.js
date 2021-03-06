// in src/views/Main/Container.js
import React from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react'
import {searchNearby} from 'utils/googleApiHelpers'
import Header from 'components/Header/Header'

import styles from './styles.module.css'

import Sidebar from 'components/Sidebar/Sidebar'



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

    console.log("map center", opts.location);

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

  onMarkerClick(item) {
    const {place} = item; // place prop
    const {push} = this.context.router;
    //now when we click on a new marker, it will push us to a new route. 
    push(`/map/detail/${place.place_id}`)
  }

  //The children component of Container.js is Map.js. Because in the route.js. Map is the route within Container.
  render() {

    let children = null;
    if (this.props.children) {
      // We have children in the Container component
      // Interesting, this is how props are passed into the children component
      children = React.cloneElement(
        this.props.children,
        {
          google: this.props.google,
          places: this.state.places,
          loaded: this.props.loaded,
          onMarkerClick: this.onMarkerClick.bind(this)
        });
    }

  	//this will return a list of cafe in the map.center area 300 radius; Defined in the opts above 
  	//map.center is not defined so we may got some warnings but the map component will just use the default center
    //use flex in the styles.content to push the sidebar to the left and left space for the map
    return (
      	<div>
        	<Map google={this.props.google} onReady={this.onReady.bind(this)} visible={false} className={styles.wrapper}>
        	    <Header />
              
              <Sidebar
                  title={'Restaurants'}
                  onListItemClick={this.onMarkerClick.bind(this)}
                  places={this.state.places}
              />
              <div className={styles.content}>
                {children}
              </div>


        	</Map>
     	</div>
    )
  }
}

Container.contextTypes = {
  router: React.PropTypes.object
}

//this is how we wrap the component in the GoogleApiWrapper
export default GoogleApiWrapper({
  apiKey: "AIzaSyB9Uc_MKU2drxUo7urUQgNy7ELtdJtnaLk"
})(Container)
