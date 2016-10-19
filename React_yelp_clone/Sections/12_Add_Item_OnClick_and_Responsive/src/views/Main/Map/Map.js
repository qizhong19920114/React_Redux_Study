import React, { PropTypes as T } from 'react'
import classnames from 'classnames'

import styles from './styles.module.css'
import Map, { Marker } from 'google-maps-react'


export class MapComponent extends React.Component {

  _renderMarkers() {
    if (!this.props.places) {
      return;
    }
    return this.props.places.map(p => {
      return <Marker
                key={p.id}
                name={p.id}
                place={p}
                label={p.name}
                onClick={this.props.onMarkerClick.bind(this)}
                map={this.props.map}
                position={p.geometry.location} />
    });
  }


  _renderChildren() {
    const {children} = this.props;
    //if map component has childeren, the we pass the props from parent to children using cloneElement
    if (React.Children.count(children) > 0) {
      return React.Children.map(children, c => {
        return React.cloneElement(c, this.props, {
          map: this.props.map,
          google: this.props.google
        })
      })

    } 
    //else, display the marker when didn't go to the detail route. 
    else {
      return this._renderMarkers();
    }
  }




  render() {
    const {children} = this.props;
    //use the visible prop of Map component so that is Map has children,which means we want to see detail, then don't show the map. 
    return (
      <Map map={this.props.map}
        google={this.props.google}
        className={styles.map}
        zoom={this.props.zoom}
        onRecenter={this.props.onMove}
        onDragend={this.props.onMove}
        onClick={this.props.onClick}
        visible={!children || React.Children.count(children) == 0}
        >
        {this._renderChildren()}
      </Map>
    )
  }


}


MapComponent.propTypes = {
  onMarkerClick: T.func
}
const identity = (...a) => a;
MapComponent.defaultProps = {
  onMarkerClick: identity
}

export default MapComponent
