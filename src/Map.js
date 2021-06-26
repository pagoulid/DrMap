import React from "react";
import { Map, GoogleApiWrapper ,Marker} from "google-maps-react";

import Data from './doctors.json'
/*Define style property for Map Component*/ 
const StyleMap ={
  width : '50%',
  height : '50%'
};
/*Define style property for Map Component*/ 

/*Parse json file and get Array of info dicts */ 

const Drdata = Data.results;/**Note : Don't use  JSONparse!!! */
/*Parse json file and get Array of info dicts */ 





 
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
  /*Set key for each Marker Component , avoiding warning of unique key prop*/ 
  MapMarks = () =>{
    return this.state.coordinates.map((item,index)=>{
      
      return <Marker key = {item.id}  position = {{lat:item.latitude,lng:item.longitude}} /> 
    })
  }
 
  /*Returns the dict object with id = 1 */  
  IDfinder = (given_id) =>{
      
      return this.state.coordinates.find(()=>{

        return given_id === 1;
      });
   
  }
  
  /**Testing to center the Map Marker with id = 1 */
  render() {
    /**Testing to center the Map due to Map Marker with id = 1 */
    const GivenID =this.IDfinder(1);
    
    
   
    /** Adjust zoom,init_centre props of Map Comp to Athens centre relocetion */
    /**Centralization of Map (id=1)*/
    return (
      
      <Map
        google={this.props.google}
        zoom={12}
        style={StyleMap}
        initialCenter={{ lat: GivenID.latitude, lng: GivenID.longitude }}
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

