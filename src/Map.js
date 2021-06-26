import React from "react";
import { Map, GoogleApiWrapper ,Marker} from "google-maps-react";
import Data from './doctors.json'
/*Define style property for Map Component*/ 
const StyleMap ={
  width : '100%',
  height : '100%'
};
/*Define style property for Map Component*/ 

/*Parse json file and get Array of info dicts */ 
const Drdata = Data.results;/**Note : Don't use  JSONparse!!! */
/*Parse json file and get Array of info dicts */ 





/*Parse json file*/ 
/**For Deployment of Google Maps  */
export class MapComponent extends React.Component {
  /**constructor */
  constructor(props){
    super(props);
    this.state ={
      coordinates : Drdata/**Not coordinates but all feats maybe can be fixed */
    }
  }
  /**constructor */
  /** mapping of Marker Component childs due to coordinates */
  MapMarks = () =>{
    return this.state.coordinates.map((item,index)=>{
      return <Marker position = {{lat:item.latitude,lng:item.longitude}} /> 
    })
  }
  render() {
    /** Adjust zoom,init_centre props of Map Comp to Athens centre relocetion */
    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={StyleMap}
        initialCenter={{ lat: 37.983810, lng: 23.727539 }}
      >
        {this.MapMarks()}
      </Map>
    );
  }
}
/*Generated  API key*/ 
export default GoogleApiWrapper({ 
  apiKey: "AIzaSyDPFYNJ0vKk-EdEZgnzZ78NKCtyn9Ufyms",
})(MapComponent);

