/*import { render } from '@testing-library/react';
import { InfoWindow } from 'google-maps-react';*/
import React from 'react';

/*Info blocks when a marker is Clicked*/
export default class Info extends React.Component{
  
    /*SetInfo = (props) =>{
        this.setState({value : [{plain_text:"Hello There"}]});
        return this.props.value
        
    } */

   /* InfoRetriever = () =>{
        return this.state.value.map((plain_text)=>{
            return <div>{plain_text}</div>
        })*/
        
/*Info Component for information of InfoWindow at Map.js line 130 {this.props.value}*/ 
   
    render(){
          
        return(
            <div><ul>
                <li>Όνομα :{this.props.value.first_name}</li>
                <li>Επώνυμο :{this.props.value.last_name}</li> 
                <li>Διεύθυνση :{this.props.value.street_address}</li>
                </ul>
            
            </div>
        );

    }
  
    


}



