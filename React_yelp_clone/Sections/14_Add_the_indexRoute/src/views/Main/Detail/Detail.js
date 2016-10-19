import React, { PropTypes as T } from 'react'
import {getDetails} from 'utils/googleApiHelpers'
import styles from './styles.module.css'

export class Detail extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      loading: true,
      place: {},
      location: {}
    }
  }
  //when page loaded, we can check to see if we have a map available in the props 
  componentDidMount() {

    if (this.props.map) {

      this.getDetails(this.props.map);
    }
  }
  //this function is triggered when prop changes, and the if statement is to make sure the place we pick has changed in the state.
  componentDidUpdate(prevProps) {
    if (this.props.map &&  // make sure we have a map
      (prevProps.map !== this.props.map ||
      prevProps.params.placeId !== this.props.params.placeId)) {
        this.getDetails(this.props.map);
    }
  }

  //use the getDetails from the googleApiHelpers
  getDetails(map) {
    // the placeId comes from the URL, passed into
    // this component through params
    const {google, params} = this.props;
    const {placeId} = params;
    // Set the loading state
    this.setState({loading: true}, () => {
      getDetails(google, map, placeId)
      .then(place => {
        const {location} = place.geometry;
        const loc = {
          lat: location.lat(),
          lng: location.lng()
        }
        console.log("in the getDetails")
        this.setState({
          place, location: loc, loading: false
        });
      })
    });

  }


  renderPhotos(place) {

    //we can get photo this way because photos is one of the attribute of place and we can use getUrl to get the pic
    if (!place.photos || place.photos.length == 0) return;
    const cfg = {maxWidth: 100, maxHeight: 100}
    return (<div className={styles.photoStrip}>
      {place.photos.map(p => {
        const url = `${p.getUrl(cfg)}.png`
        return (<img key={url} src={url} />)
      })}
    </div>)

  }

  render() {

    

    //display loading if we are still loading
    if (this.state.loading) {
      return (<div className={styles.wrapper}>
                Loading...
              </div>);
    }
    // We're no longer loading when we get here
    const {place} = this.state;
    console.log("in the Detail component", place.name)
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>{place.name}</h2>
        </div>
        <div className={styles.details}>
          {this.renderPhotos(place)}
         </div>
      </div>


    )
  }

}

export default Detail