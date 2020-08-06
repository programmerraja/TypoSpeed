import React  from 'react';
import "./ResetButton.css";


function ResetButton (props)
{
		 return (
		 			<>
		 				<input id="reset"  type="button" onClick={props.onClick} value="Reset"/>
		 			</> 
		 		)
 }


export default ResetButton;
