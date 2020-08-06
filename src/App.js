import React  from 'react';
import icon from './image/icon.png';
import TextGenerator from "./components/TextGenerator";
import './App.css';


class App extends React.Component{
 	render()
			{
				return	(
							<>

							<div id="title"><span>TypoSpeed</span><img src={icon} height="50px" alt="icon"/></div>

							<TextGenerator/>
							</>
						)
			}
}
if(module.hot)
{
	module.hot.accept();
}
export default App;
