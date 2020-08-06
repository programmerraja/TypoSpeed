import React  from 'react';
import "./StartButton.css";


function StartButton (props)
{
		 return (
		 			<>
		 				<input  id="start" type="button" onClick={props.onClick} value="Start"/>
		 			</> 
		 		)
 }


export default StartButton;
