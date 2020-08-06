import React  from 'react';



function Timer (props)
{
		//add zero and slice last two element
		let min=("0"+props.min).slice(-2);
		let sec=("0"+props.sec).slice(-2);

		 return (
		 			<>
		 				<p>{min}:{sec}</p>
		 			</> 
		 		)
 }


export default Timer;
