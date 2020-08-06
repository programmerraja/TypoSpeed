import React  from 'react';
import "./UserInput.css";


function UserInput (props)
{
		 return (
		 			<>
		 				<textarea  rows="9" cols="40" onChange={props.onInputchange} value={props.value} placeholder="Start typing by pressing Start button"></textarea>
		 			</> 
		 		)
 }


export default UserInput;
