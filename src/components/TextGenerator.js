import React  from 'react';
import "./TextGenerator.css";

import UserInput from "./UserInput";
import StartButton from "./StartButton";
import ResetButton from "./ResetButton";
import FetchQuote from "./API/FetchQuote"
import Timer from "./Timer"

class TextGenerator extends React.Component{
	constructor (props)
	{
		super(props);
		this.state=	{
						  quote:"Fetching....",
						  character:"Fetching....",
						  value:"",
						  sec:0,
						  min:0
					};
	
		this.clearinterval="";
		this.wordpermin=0;
		this.isfirst=true;
		//binding the function 
		this.onInputchange=this.onInputchange.bind(this);
		this.onClick=this.onClick.bind(this);
		this.time=this.time.bind(this);
		this.getQuote=this.getQuote.bind(this);
		
	}
	 componentDidMount()
	{
		//once component mount get the quote 
		 this.getQuote();
	}
   	async getQuote()
    {
    	 //getting the quote and store it on state
    	 let quote=await FetchQuote();
		 this.setState({quote:quote,character:quote,value:""})
    }
    onInputchange(event)
	{
		//userenter quote len
		let userquote=event.target.value;

		//user quote length
		let userindex=userquote.length;
		//our generated quote length
		let index=this.state.quote.length;
		//to store the span tag 
		let character=[]
		//to store class name
		let className;
		//to find if user is finish
		let isfinish=true;
		//iterating the  generated quote
		for(let i=0;i<index; i<i++)
		{
			//if user enter char and  generated quote is equal 
		   if(userquote[i]===this.state.quote[i])
			{
				className="goodentry";
			}
			//if user enter char and  generated quote is not equal
			else if(userquote[i]!==this.state.quote[i] && userindex>i)
			{
				className="badentry";
				isfinish=false;
			}
			//if none add span with char 
			else
			{
				className=""
				isfinish=false;
			}
			character.push(<span 
								key={i.toString()} 
								className={className}
							   >
								{this.state.quote[i]}
								</span>);
		}

		// check if he finsih and the timer is on
		if(isfinish && (this.state.min || this.state.sec))	
		{

			clearInterval(this.clearinterval);
			if(this.state.min )
			{
				var sec=this.state.min*60;
				var min=(sec+this.state.sec)/60;	
			}
			else
			{
				 min=(this.state.sec)/60;	
			}
			//converting sec to min 
			let word=this.state.quote.split(" ").length //finding the no of word 
			this.wordpermin= Math.floor((word/min)); //calc the word per min 

		}
		this.setState({character:character,value:userquote})
	}
	//start
	onClick(event)
	{
		/*

		 if user clicked start button for first time and the timer is not running
		 isfirst is used to avoid run timer fast because when user click fastly
		 start button more than twice it cause the state to update late so the 
		 new  timer is created it cause run timer fast so to avoid is first is used 

		 */

		if(!this.state.sec && event.target.value==="Start" && this.isfirst)
		{
		//setting the interval for every sec 
		this.clearinterval=setInterval(this.time,1000);
		this.isfirst=false;
		}
		

		//if reset button clicked or the start button is clicked while timer is running 
		else 
		{
			//setting back the isfirst to true 
			this.isfirst=true;
			//getting new qoute
			this.getQuote();
			//clear the interval and timer if user press reset while the timer is running
			clearInterval(this.clearinterval);
			this.setState({min:0,sec:0 ,quote:"Fetching....",character:"Fetching...."});
			this.wordpermin=0;

		}
	}
	
	time()
	{
			if(this.state.sec===60)
			{
				//increment  min by 1 if sec=60
				this.setState((prevstate)=>{
				return {sec:0,min:prevstate.min+1}
						})
			}
			else
			{
					//increment  sec by 1 
					this.setState((prevstate)=>{
						return {sec:prevstate.sec+1}
					})

			}
		
	}
	
	render()
	{
	 	return(
	 			<div id="container">
	 			<p id="quote">{this.state.character}</p>

	 			<div id="mini-container">

	 			<Timer min={this.state.min} sec={this.state.sec}/>
	 			<StartButton  onClick={this.onClick}/>
	 			<p>{this.wordpermin}WPM</p>

	 			</div>
	 			
	 			<UserInput  onInputchange={this.onInputchange} value={this.state.value}/>
	 			<ResetButton  onClick={this.onClick}/>
	 			</div>
	 		)
	}

}

export default TextGenerator;

