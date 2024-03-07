
async function fetchData(url){
	try{
	const response = await fetch(url);
	if (!response.ok){
		throw new Error("LOL");
	}
	const data = await response.json();
	return data;
	}
	catch(error){
		console.log(error)
	}
}
async function getIntruderStats(){
	let name = document.getElementById("intruderName").value.toLowerCase();
	let apiUrl1 = 'https://api.intruderfps.com/agents' +'?PerPage=100&Q=' + name;
	const rawData1 = await fetchData(apiUrl1);
	
	let steamId = JSON.stringify(rawData1.data[0].steamId);
	let IGN = JSON.stringify(rawData1.data[0].name).replace(/['"]+/g, '');
	const outName = document.getElementById("iName");
	const outName2 = document.getElementById("iName2");
	outName.textContent = `${IGN}'s stats:`;
	outName2.textContent = `${IGN}'s extra jazz:`;
	let apiUrl2 = 'https://api.intruderfps.com/agents/' +steamId.replace(/['"]+/g, '')+'/stats';
	const rawData2 = await fetchData(apiUrl2);
	
	const data = JSON.stringify(rawData2);
	
	const outStats = document.getElementById("output");
	outStats.textContent = data;
	
	let apiUrl3 = 'https://api.intruderfps.com/agents/' +steamId.replace(/['"]+/g, '');
	const rawData3 = await fetchData(apiUrl3);
	const data2 = JSON.stringify(rawData3);
	const outStats2 = document.getElementById("output2");
	outStats2.textContent = data2;
}
