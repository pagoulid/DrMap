import './Tag.css';
import React from "react";


export default class Tag extends React.Component{
    /*Circle Animation Inside InfoWindow*/ 
    render(){
        const circleConfig = {
            viewBox: '0 0 38 38',
            x: '20',
            y: '20',
            radio: '5.91549430918954',
            
          }
        return(
         <figure>
            <svg className = "SVG" viewBox={circleConfig.viewBox}>
                <circle
                className="ring"
                cx={circleConfig.x}
                cy={circleConfig.y}
                r={circleConfig.radio}
                fill="transparent"
                stroke="gray"
                ><g><text x = "25%" y="25%" className = "Initials"><h2>{this.props.First_char}{this.props.Second_char}</h2></text></g></circle>
            </svg>
          </figure>
        
        );
    }
}