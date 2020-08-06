
async function FetchQuote (props)
{
		
	let link="https://api.quotable.io/random";
	let data =await fetch(link);
	data=await data.json();
	return data["content"]
 }


export default FetchQuote;
