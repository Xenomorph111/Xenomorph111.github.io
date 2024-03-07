
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
	
	let data = "";
	tehe = JSON.stringify(rawData2).slice(1,-1).split(",");
	for(let x in tehe){
		data = data+tehe[x]+"<br>";
	}
	//const data = JSON.stringify(rawData2);
	
	const outStats = document.getElementById("output");
	outStats.innerHTML = data;
	
	let apiUrl3 = 'https://api.intruderfps.com/agents/' +steamId.replace(/['"]+/g, '');
	const rawData3 = await fetchData(apiUrl3);
	tehe2 = JSON.stringify(rawData3).slice(1,-1).split(",");
	let data2 = "";
	for(let y in tehe2){
		data2 = data2+tehe2[y]+"<br>";
	}
	//const data2 = JSON.stringify(rawData3);
	const outStats2 = document.getElementById("output2");
	outStats2.innerHTML = data2;
}
async function sussyAmongusBalls(){
	//8======D 0
	//let loadingWheel = document.getElementById("loading1");
	//loadingWheel.innerHTML = "<img src=../assets/loading.gif></img>";
	let loadingStat = document.getElementById("loading2");
	loadingStat.innerHTML = "0%";
	
	let stat = document.getElementById("statName").value;
	let amnt = document.getElementById("statAmnt").value;
	let rawStat = stat.slice(6);
	let apiUrl = 'https://api.intruderfps.com/agents' +'?OrderBy=' + stat +'%3Adesc&PerPage='+amnt+'&&Page=1';
	const rawData = await fetchData(apiUrl);
	//const data = JSON.stringify(rawData.data);
	let leaderboard = "<table><tr><th>#</th><th>Pic</th><th>Name</th><th>&nbsp;Amount&nbsp;</th></tr>";
	let count = 0;
	for (let person in rawData.data){
		count= count+1;
		let dynApi = 'https://api.intruderfps.com/agents/' + JSON.stringify(rawData.data[person].steamId).slice(1,-1)+"/stats";
		let timeKiller = await fetchData(dynApi);
		eval('timeKiller = JSON.stringify(timeKiller.'+rawStat+');');
		leaderboard = leaderboard +"<tr><td>&nbsp;"+count+"&nbsp;</td><td>"+"<img height=50 width = 50 src="+JSON.stringify(rawData.data[person].avatarUrl)+"alt=\"\"></td><td>&nbsp;"+JSON.stringify(rawData.data[person].name).slice(1,-1)+"&nbsp;</td><td>"+timeKiller+"</td></tr>";
		loading = (count/amnt)*100;
		loadingStat.innerHTML = loading.toFixed(0) +"%";
	}
	//loadingWheel.innerHTML = "";
	loadingStat.innerHTML = "";
	leaderboard = leaderboard+"</table>";
	let outStats = document.getElementById("output3");
	outStats.innerHTML = leaderboard;
}