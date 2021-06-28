import React from "react";

import { Map, GoogleApiWrapper ,Marker, InfoWindow} from "google-maps-react";
import Info from './Info'

import Data from './doctors.json'
let DEFAULT_ZOOM = 13;
let LAT_FIXEDVAL = 0.0055000;/**0.0050000 Initial */
let LNG_FIXEDVAL = 0.0;
/*Define style property for Map Component*/ 
const StyleMap ={
  width : '90%',
  height : '90%'
};
/*Define style property for Map Component*/ 

/*Parse json file and get Array of info dicts */ 

const Drdata = Data.results;/**Note : Don't use  JSONparse!!! */
/*Parse json file and get Array of info dicts */ 


const zoomRef = React.createRef();



/**For Deployment of Google Maps  */
export class MapComponent extends React.Component {
  /**constructor */
  constructor(props){
    super(props);
    
    
    this.state ={
      
      coordinates : Drdata,/**Not coordinates but all feats maybe can be fixed */
      ActiveMarker: -1, /**Openwindow on MarkerClick */
      isWinOpen: false ,/**If true opens Window,else close */
      cordlat: 0.0 ,
      cordlng: 0.0,
      information :{first_name :"",last_name:"",street_address:""},
      mapzoom: DEFAULT_ZOOM,
      
      
      
      
       

    }
    /*this.zoomRef = React.createRef();*/
     
    
    
    
    
  }
  /**constructor */
  /**Openwindow test , when click on marker set id of info and condition to open window*/
  handleToggleOpen = (mark) => {/** EventHandler  for Mark clicking to open info*/
    this.setState({                 /*Line 62 on MarkMaps mapping*/ 
        ActiveMarker: mark.id,
        isWinOpen : true,
        cordlat: mark.latitude,
        cordlng: mark.longitude,
        information :{first_name :mark.first_name,last_name:mark.last_name,street_address:mark.street_address}
    });
}

handleToggleClose = () => {/**EventHandler for clicking mark info to close */
  this.setState({           /**line 119 on InfoWindow */
      ActiveMarker: -1,
      isWinOpen : false,
      cordlat: 0.0 ,
      cordlng: 0.0,
      

  });
}
/**Openwindow test */

/*Handle the zoom to  infowindow alignment purposes*/ 
 /**Createref Test */
 
 
  
/*componentWillUnmount(){
  let Outerref = ref.current+1;
  this.setState({Zoomref:Outerref,mapzoom:DEFAULT_ZOOM});

}*/
 _handleZoomInChanged() {
  /** Check if current reference is equal to given map zoom */
  if(this.state.ActiveMarker === -1){/**If clicks on Marker don't change state of zoom */
    
    DEFAULT_ZOOM=DEFAULT_ZOOM+1;
    /**Adjust location of info window at top of clicked marker on zoom out */
    LAT_FIXEDVAL = LAT_FIXEDVAL/2.0000000; /**Adjust Fixed Value on Zoom In */
  /*Change curr ref(Zoom In)*/
   
  
    zoomRef.current = zoomRef.current + 1;
    this.setState({mapzoom:DEFAULT_ZOOM})
    console.log('Current Zoom State :',this.state.mapzoom,'Current Fixed Value',LAT_FIXEDVAL);
  }
  
  
}

_handleZoomOutChanged() {
  /** Check if current reference is equal to given map zoom */
  if(this.state.ActiveMarker === -1){/**If clicks on Marker don't change state of zoom */
    DEFAULT_ZOOM=DEFAULT_ZOOM-1;
    /**Adjust location of info window at top of clicked marker on zoom out */
    LAT_FIXEDVAL = LAT_FIXEDVAL*2.0000000; /**Adjust Fixed Value on Zoom Out */
  /*Change curr ref(Zoom In)*/
  
  
    zoomRef.current = zoomRef.current - 1;
    this.setState({mapzoom:DEFAULT_ZOOM})
    console.log('Current Zoom State :',this.state.mapzoom,'Current Fixed Value',LAT_FIXEDVAL);
  }
  
  
}

/*_handleOnIdle() {
  /** Check if current reference is equal to given map zoom */
  
  /*DEFAULT_ZOOM=DEFAULT_ZOOM+1;*/
  /*Change curr ref(Zoom In)*/
  
  
  /*zoomRef.current = zoomRef.current + DEFAULT_ZOOM;*/
 /* this.setState({mapzoom:DEFAULT_ZOOM})
  
}*/






/**Createref Test */




  /** mapping of Marker Component childs due to coordinates */
  /*Set key for each Marker Component , avoiding warning of unique key prop*/ 
  /*onClick = {() =>{ console.log("Hi!")}*/ 
  MapMarks = () =>{
    return this.state.coordinates.map((item,index)=>{
      
      return <Marker key = {item.id} label={item.id.toString()}  onClick = {() =>{ return this.handleToggleOpen(item)}}
                position = {{lat:item.latitude,lng:item.longitude}} > 
                
                  
                
             </Marker>
            
    })
  }

 


 
  /*Returns the dict object with id = 1 */  
  IDfinder = (given_id) =>{
      
      return this.state.coordinates.find(()=>{

        return given_id === 1;
      });
   
  }
  
  /**Testing to center the Map Marker with id = 1 */
  render(){
    /**Testing to center the Map due to Map Marker with id = 1 */
    const GivenID =this.IDfinder(1);
    
    
    
   
    /** Adjust zoom,init_centre props of Map Comp to Athens centre relocetion */
    /**Centralization of Map (id=1)*/
    /**When isWinOpen is True,means that Marker onclick triggered so component InfoWindow is accessible */
    /**When isWinOpen is False , means that InfoWindow onClose triggered so component InfoWindow is not anymore 
     accesible until changes on  the state of isWinOpen*/
     /**At InfoWindow fixing direction of passed latitude adding a fixed value
      (visualisation of window at top of marker) */
    /* onZoomChanged={this._handleZoomChanged()}*/ 
      return (
     
      
      <Map
        google={this.props.google}
        ref={zoomRef}
        zoom={this.state.mapzoom}
        style={StyleMap}
        initialCenter={{ lat: GivenID.latitude, lng: GivenID.longitude }}
        onClick ={this._handleZoomInChanged.bind(this)}
        onRightclick ={this._handleZoomOutChanged.bind(this)}
       
        
      >
       {this.MapMarks()}
       {this.state.isWinOpen && <InfoWindow  visible = {true} onClose ={() =>{return this.handleToggleClose(this)}} position = {{lat:this.state.cordlat+ LAT_FIXEDVAL,lng:this.state.cordlng - LNG_FIXEDVAL}} ><Info value = {{first_name :this.state.information.first_name,last_name:this.state.information.last_name,street_address:this.state.information.street_address}}/></InfoWindow> }
       
      </Map>
    );
    
  }
}
/*this._handleZoomChanged.bind(this) for zoom change*/ 
/*Succesfull pop up -> Double Click*/
/**<InfoWindow  onClose ={() =>{return this.handleToggleClose(item.id)}} position = {{lat:item.latitude,lng:item.longitude}} ><div><h1>YEEEEEEEE</h1></div></InfoWindow> */
/*Generated  API key*/ 
export default GoogleApiWrapper({ 
  apiKey: "AIzaSyDPFYNJ0vKk-EdEZgnzZ78NKCtyn9Ufyms",
})(MapComponent);

