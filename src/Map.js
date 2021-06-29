import './Map.css'
import React from "react";
import { Map, GoogleApiWrapper ,Marker, InfoWindow} from "google-maps-react";
import Info from './Info'
import Data from './doctors.json'
/*Initial Zoom of Map on Load */ 
let DEFAULT_ZOOM = 13;
/*To adjust infowindow coordinates at top of marker*/ 
let LAT_FIXEDVAL = 0.0055000;
let LNG_FIXEDVAL = 0.0;

/*Define style property for Map Component*/ 
const StyleMap ={
  width : '50%',
  height : '55%',
  display:'inline-block',
  position: 'absolute',
  left: 650,
  top: 195
  
};
/*Define style property for Map Component*/ 

/**For InfoWindow,maybe useless */


/*Parse json file and get Array of info dicts */ /**Note : Don't use  JSONparse!!! */
const Drdata = Data.results;
/*Create Reference for handling Zoom In/Out states*/ 
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
      information :{first_name :"",last_name:"",street_address:"",city:"",country:""
                  ,zip_code:"",languages:"",practice_start_date:"",Work_experience:0},

      mapzoom: DEFAULT_ZOOM,

      

      
      
      
      
       

    }
    
     
    
    
    
    
  }
  /**constructor */


  /** When click on marker , set  info of marker to be displayed and condition to open window*/
  handleToggleOpen = (mark) => {/** EventHandler  for Mark clicking to open info*/
    /*Calculate years of experience -> current year - Dr practice start year*/ 
    let today = new Date();
    let Infodate = mark.practice_start_date.split('-');/**practice date -> YY-MM-DD */
    let experience = today.getFullYear() - parseInt(Infodate[0]);
      
     
    
    
    this.setState({                 /*Line 62 on MarkMaps mapping*/ 
        ActiveMarker: mark.id,
        isWinOpen : true,
        cordlat: mark.latitude,
        cordlng: mark.longitude,
        information :{first_name :mark.first_name,last_name:mark.last_name,
          street_address:mark.street_address,city:mark.city,country:mark.country,
            zip_code:mark.zip_code,languages:mark.languages,
              practice_start_date:mark.practice_start_date,Work_experience:experience}
    });
    
    
    
    
}

handleToggleClose = () => {/**EventHandler for clicking mark info to close */
  /**Initiate state back on default */ /**line 119 on InfoWindow */
  this.setState({           
      ActiveMarker: -1,
      isWinOpen : false,
      cordlat: 0.0 ,
      cordlng: 0.0,
      information :{first_name :"",last_name:"",
        street_address:"",city:"",country:"",
          zip_code:"",languages:"",
            practice_start_date:"",Work_experience:""}
      

  });
}

 _handleZoomInChanged() {/**Event Handler for clicking to zoom-> Left click on any location at Map 
                            except Markers */

 
  if(this.state.ActiveMarker === -1){/**Clicks on Marker don't change state of zoom */
    
    
     /*Update zoom and its curr ref(Zoom In)*/
    DEFAULT_ZOOM=DEFAULT_ZOOM+1;
    zoomRef.current = zoomRef.current + 1;
    this.setState({mapzoom:DEFAULT_ZOOM})

    /**Adjust location of info window at top of clicked marker on zoom in */
    LAT_FIXEDVAL = LAT_FIXEDVAL/2.0000000; 
 
  
    /*console.log('Current Zoom State :',this.state.mapzoom,'Current Fixed Value',LAT_FIXEDVAL);*/
  }
  
  
}

_handleZoomOutChanged() {/**Event Handler for clicking to zoom out-> Right click on any location at Map 
  except Markers */
 
  if(this.state.ActiveMarker === -1){/**If clicks on Marker don't change state of zoom */
    
    /*Update zoom and its curr ref(Zoom Out)*/
    DEFAULT_ZOOM=DEFAULT_ZOOM-1;
    zoomRef.current = zoomRef.current - 1;
    this.setState({mapzoom:DEFAULT_ZOOM})

    /**Adjust location of info window at top of clicked marker on zoom out */
    LAT_FIXEDVAL = LAT_FIXEDVAL*2.0000000; 
  
    /*console.log('Current Zoom State :',this.state.mapzoom,'Current Fixed Value',LAT_FIXEDVAL);*/
  }
  
  
}













  /** Mapping coordinates to  Marker Component childs  */
  /*Set key for each Marker Component , avoiding warning of unique key prop*/ 
  /**onClick -> when Marker is clicked , trigger handler for open info window(line 75) */
   
  MapMarks = () =>{
    return this.state.coordinates.map((item,index)=>{
      
      return <Marker key = {item.id} label={item.id.toString()}  disableDoubleClick = {true} onClick = {() =>{ return this.handleToggleOpen(item)}}
                position = {{lat:item.latitude,lng:item.longitude}} > 
                
                  
                
             </Marker>
            
    })
  }

 

  /*Returns the dict object with given_id  due to condition*/  
  IDfinder = (given_id) =>{
      
      return this.state.coordinates.find(()=>{

        return given_id === 1;
      });
   
  }
  
  
  render(){
    /** Center the Map due to Map Marker with id = 1 */
    const GivenID =this.IDfinder(1);
  
    /** Adjust zoom,init_centre props of Map Comp to Athens centre relocation */

    /**Centralization of Map (id=1)*/

    /**Left/Right click -> Zoom In/Out */
    /**Fix lat,lng for infowindow adding fixed values to Lat Long */
   
    /**Before adding InfoWindow Component check first state of isWinOpen(gets triggered when click on mark)  */ 
     
     

       /**Pass information to be displayed at Info child Component */
       /**Info Initials --> Tag first_char second char pass initials for Animation inside circle */
      
      return (
      
      <Map
        className = "Mapbox"
        
        google={this.props.google}
        ref={zoomRef}
        
        zoom={this.state.mapzoom}
        style={StyleMap}
        initialCenter={{ lat: GivenID.latitude, lng: GivenID.longitude }}
        onClick ={this._handleZoomInChanged.bind(this)}
        onRightclick ={this._handleZoomOutChanged.bind(this)}
        
       
        
      >
        
        {this.MapMarks()}
        {this.state.isWinOpen && <InfoWindow class="InfoWindow"  
          visible = {true} onClose ={() =>{return this.handleToggleClose(this)}} 
          position = {{lat:this.state.cordlat+ LAT_FIXEDVAL,
          lng:this.state.cordlng - LNG_FIXEDVAL}} >
            <Info Initials={{F:this.state.information.first_name[0],S:this.state.information.last_name[0]}} value = {{first_name :this.state.information.first_name,
              last_name:this.state.information.last_name,
              street_address:this.state.information.street_address,
              city:this.state.information.city,country:this.state.information.country,
              zip_code:this.state.information.zip_code,
              languages:this.state.information.languages,
              Work_experience:this.state.information.Work_experience}}/></InfoWindow> }
        
      </Map>
    );
      
  }
}

/*Generated  API key*/ 
export default GoogleApiWrapper({ 
  apiKey: "AIzaSyDPFYNJ0vKk-EdEZgnzZ78NKCtyn9Ufyms",
})(MapComponent);

