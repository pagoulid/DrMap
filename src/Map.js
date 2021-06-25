import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
/**For Deployment of Google Maps  */
export class MapComponent extends React.Component {
  render() {
    const mapStyles = {
      width: "100%",
      height: "100%",
    };
    return (
      <Map
        google={this.props.google}
        zoom={18}
        style={mapStyles}
        initialCenter={{ lat: 9.761927, lng: 79.95244 }}
      />
    );
  }
}
/*Generated  API key*/ 
export default GoogleApiWrapper({ 
  apiKey: "AIzaSyDPFYNJ0vKk-EdEZgnzZ78NKCtyn9Ufyms",
})(MapComponent);
