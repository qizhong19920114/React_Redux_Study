import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Container from './Container'
import Map from './Map/Map'
import Detail from './Detail/Detail'

export const makeMainRoutes = () => {

  //we use path parameter, which allows us to pass a portion of the path to the component related to this route as a prop
  return (
    <Route path="/" component={Container}>
    	<Route path="map" component={Map} >
		    <Route path="detail/:placeId"
		            component={Detail} />
	    </Route>
	    <IndexRoute component={Map} />
    </Route>
  )
}

export default makeMainRoutes;