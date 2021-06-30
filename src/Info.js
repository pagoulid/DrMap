
import './Info.css';
import React from 'react';
import Tag from './Tag';


/*Content of Info window blocks when a marker is Clicked*/
export default class Info extends React.Component{
  /** */       
/*Info Component for information of InfoWindow at Map.js line 130 {this.props.value}*/ 
    render(){
        
        return(
            <div className="Info">
                <Tag First_char = {this.props.Initials.F} Second_char = {this.props.Initials.S}/> 
                <p className ="Name">{this.props.value.first_name} {this.props.value.last_name}</p>
                <p className="Location">{this.props.value.street_address} {this.props.value.city} {this.props.value.country} {this.props.value.zip_code}</p>
                <p className="Other">{this.props.value.Age} years old , Years of work experience: {this.props.value.Work_experience} , Languages: {this.props.value.languages}</p>

            
            </div>
        );

    }
  
    


}



