
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

async function fetchManyData(urls){
	const somethings = urls.map(fetchData);
	const responses = await Promise.all(somethings);
	return responses;
}

function makeStatLeaderUrl(stat){
	return 'https://api.intruderfps.com/agents' +'?OrderBy=' + stat +'%3Adesc&PerPage='+100+'&&Page=1';
}

function makeStatLeaderUrls(stats){
	const cookedUrls = stats.map(makeStatLeaderUrl);
	return cookedUrls;
}

async function getIntruderStats(steamId){
	//let name = document.getElementById("intruderName").value.toLowerCase();
	let apiUrl1 = 'https://api.intruderfps.com/agents/'+steamId;
	const rawMisc = await fetchData(apiUrl1);
	
	let apiUrl2 = 'https://api.intruderfps.com/agents/' +steamId+'/stats';
	const rawStats = await fetchData(apiUrl2);


	const titlePicHTML = document.getElementById("profile");
	let pic = JSON.stringify(rawMisc.avatarUrl).slice(1,-1);
	titlePicHTML.href = pic;
	


	const killsHTML = document.getElementById("kills");
	let kills = JSON.stringify(rawStats.kills);
	killsHTML.innerHTML = kills;
	
	const deathsHTML = document.getElementById("deaths");
	let deaths = JSON.stringify(rawStats.deaths);
	deathsHTML.innerHTML = deaths;
	
	const arrestsHTML = document.getElementById("arrests");
	let arrests = JSON.stringify(rawStats.arrests)
	arrestsHTML.innerHTML = arrests;
	
	const tkHTML = document.getElementById("teamkills");
	let tks = JSON.stringify(rawStats.teamKills)
	tkHTML.innerHTML = tks;
	
	const mwHTML = document.getElementById("mwon");
	let mw = JSON.stringify(rawStats.matchesWon)
	mwHTML.innerHTML = mw;
	
	const mlHTML = document.getElementById("mlost");
	let ml = JSON.stringify(rawStats.matchesLost);
	mlHTML.innerHTML = ml;
	
	const healsHTML = document.getElementById("heals");
	let heals = JSON.stringify(rawStats.heals)
	healsHTML.innerHTML = heals;
	
	const ghHTML = document.getElementById("gothealed");
	let gh = JSON.stringify(rawStats.gotHealed);
	ghHTML.innerHTML = gh;
	
	const timeHTML = document.getElementById("time");
	let time = JSON.stringify(rawStats.timePlayed);
	//neaten that fuck up
	let timeHours = time/(60*60);
	timeHTML.innerHTML = timeHours+"h";
	
	
	const level = document.getElementById("level");
	level.innerHTML = JSON.stringify(rawStats.level);
	
	const name = document.getElementById("name");
	name.innerHTML = JSON.stringify(rawMisc.name).slice(1,-1);
	
	const picHTML = document.getElementById("pic");
	picHTML.innerHTML = "<img src="+pic+"></img>";
	
	const role = document.getElementById("role");
	role.innerHTML = JSON.stringify(rawMisc.role).slice(1,-1);

	
	//let data = "";
	//tehe = JSON.stringify(rawData2).slice(1,-1).split(",");
	//for(let x in tehe){
	//	data = data+tehe[x]+"<br>";
	//}
	//const data = JSON.stringify(rawData2);
	
	//const outStats = document.getElementById("output");
	//outStats.innerHTML = data;
	
	//let apiUrl3 = 'https://api.intruderfps.com/agents/' +steamId.replace(/['"]+/g, '');
	//const rawData = await fetchData(apiUrl3);
	//tehe2 = JSON.stringify(rawMisc).slice(1,-1).split(",");
	//let data2 = "";
	//for(let y in tehe2){
	//	data2 = data2+tehe2[y]+"<br>";
	//}
	//const data2 = JSON.stringify(rawData3);
	//const outStats2 = document.getElementById("output2");
	//outStats2.innerHTML = data2;
}

async function sussyAmongusBalls(){
	//definitions, grab the stat name, and the amount the user wants, and slice the stat so its only the usable version for us
	let stat = document.getElementById("statName").value;
	let amnt = document.getElementById("statAmnt").value;
	let leaderboard = "<table><tr><th>#</th><th>Pic</th><th>Name</th><th>&nbsp;Amount&nbsp;</th></tr>";
	var trudaList = [];
	let count = 0;
	let rawStat = stat.slice(6);
	let outStats = document.getElementById("output3");
	
	//we also wanna disable that pesky button for the time being, i dont want them to break everything...
	const button = document.getElementById("buttonLeader");
	button.disabled = true;
	
	//first we lie and tell them we are loading (ARE ASSES ARE NOT LOADING)
	outStats.innerHTML = "<img width=25 height=25 src=../assets/loading.gif></img>";
	
	//make the url to grab the data we want. then get the data
	let apiUrl = 'https://api.intruderfps.com/agents' +'?OrderBy=' + stat +'%3Adesc&PerPage='+amnt+'&&Page=1';
	const rawData = await fetchData(apiUrl);
	
	//lets wait for the async function to finish so we get 100 users all ordered
	sortedTrudaList = await theSUSSYIMPOSTERISINMYBRAINHELPMEGODHELPMEHELPHELP(rawData,rawStat);

	//sort this list, wait. we dont need to anymore, LETS FUCKING GO EZ CLAP FORTNITE DUBS EZ EZ EZ EZ EZ EZ
	/*
	var sortedTrudaList = trudaList.sort(function(a, b) {
		return b[2] - a[2];
	});
	*/
	
	//now we assemble the table, in its glory
	for(let elem in sortedTrudaList){
	count = count+1;
	leaderboard = leaderboard +"<tr><td>&nbsp;"+count+"&nbsp;</td><td>"+"<img height=50 width = 50 src="+sortedTrudaList[elem][0]+"alt=\"\"></td><td>&nbsp;"+sortedTrudaList[elem][1]+"&nbsp;</td><td>"+sortedTrudaList[elem][2]+"</td></tr>";
	}
	leaderboard = leaderboard+"</table>";
	
	//now we grab where the table is, and we paste it in, and we are so done, AND we re-enable that button
	outStats.innerHTML = leaderboard;
	button.disabled = false;
}

async function updateUIElements(div,content1,content2,url){
	let nameJumble = await fetchData(url);
	let name = JSON.stringify(nameJumble.name);
	div.innerHTML = content1+name.slice(1,-1)+content2;
}


window.onload = function() {
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const steamid = urlParams.get('steamid');

if(!steamid==true){
	//first time?
	//console.log("THE URL IS NEW");
	const baby = document.getElementById("newborn");
	baby.style.display = "block";
}
else
{
	//we have a profile boyysssssssss
	//console.log("THE URL IS OLD");
	const main = document.getElementById("mainbody");
	const title = document.getElementById("title");
	let apiUrl = 'https://api.intruderfps.com/agents/'+steamid;
	//updateUIElements(main,"<h1>","</h1>",apiUrl);
	updateUIElements(title,"","'s Profile",apiUrl);
	getIntruderStats(steamid);
}
}