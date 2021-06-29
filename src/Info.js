/*import { render } from '@testing-library/react';
import { InfoWindow } from 'google-maps-react';*/
import React from 'react';

/*Info blocks when a marker is Clicked*/
export default class Info extends React.Component{
  
   
        
/*Info Component for information of InfoWindow at Map.js line 130 {this.props.value}*/ 
  

   

    render(){
          
        return(
            <div className="Info">
                 
                <p className ="Name">{this.props.value.first_name} {this.props.value.last_name}</p>
                <h4 className="Location">{this.props.value.street_address} {this.props.value.city} {this.props.value.country} {this.props.value.zip_code}</h4>
                <h6 className="Location">Years of work experience:{this.props.value.Work_experience} , Languages: {this.props.value.languages}</h6>

            
            </div>
        );

    }
  
    


}



