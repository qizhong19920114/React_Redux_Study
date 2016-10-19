// in src/views/Main/Container.js
import React from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react'



export class Container extends React.Component {
  render() {
    return (
      <div>
        Hello from the container
        <Map google={this.props.google} />
      </div>
    )
  }
}


//this is how we wrap the component in the GoogleApiWrapper
export default GoogleApiWrapper({
  apiKey: "AIzaSyB9Uc_MKU2drxUo7urUQgNy7ELtdJtnaLk"
})(Container)
