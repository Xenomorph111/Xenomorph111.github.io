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

function makeUrl(stat, page){
	let url = 'https://api.intruderfps.com/agents' +'?OrderBy=' + stat +'%3Adesc&PerPage=100&Page='+page;
	return url
}
function check(data){
}
async function findYourLeaderboardPosition(steamId,stat){
	let j = 0;
	let position = 0;
	var rawSewage;
	while(true){
		url = makeUrl(stat,j+1);
		const rawSewage = await fetchData(url);
		const peeps = await rawSewage.data;
		//leaderboardOfStat = rawSewage.data;
		for( let player in peeps){
			if(JSON.stringify(peeps[player].steamId).slice(1,-1)==steamId){
				finalPosition = position+1
				switch(finalPosition%10){
					case 1:
						return finalPosition+"st";
					case 2:
						return finalPosition+"nd";
					case 3:
						return finalPosition+"rd";
					default:
						return finalPosition+"th";
				}
			}
			else{
			if(position>1000){
				return "NA";
			}
			else{
			position=position+1;
			}
			}
		}
		
		j=j+1;
	}
}


function neatenTime(time){
	let timeHours = time/(60*60);
	let timeRealHours = Math.floor(timeHours);
	let timeMinutes = (timeHours - timeRealHours)*60;
	let timeRealMinutes = Math.floor(Math.round(timeMinutes));
	return timeRealHours+"h "+timeRealMinutes+"m";
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
	

	
	const kdHTML = document.getElementById("kd");
	let killRatio = Math.round((kills/deaths + Number.EPSILON) * 100) / 100;
	kdHTML.innerHTML = killRatio;
	

	
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
	
	const tdHTML = document.getElementById("teamdamage");
	let td = JSON.stringify(rawStats.teamDamage);
	tdHTML.innerHTML = td;
	
	const tknHTML = document.getElementById("teamknockdowns");
	let tkn = JSON.stringify(rawStats.teamKnockdowns);
	tknHTML.innerHTML = tkn;
	
	const capHTML = document.getElementById("captures");
	let cap = JSON.stringify(rawStats.captures);
	capHTML.innerHTML = cap;
	
	const pickHTML = document.getElementById("pickups");
	let pick = JSON.stringify(rawStats.pickups);
	pickHTML.innerHTML = pick;
	
	const survHTML = document.getElementById("survivals");
	let surv = JSON.stringify(rawStats.survivals);
	survHTML.innerHTML = surv;
	
	const suiHTML = document.getElementById("suicides");
	let sui = JSON.stringify(rawStats.suicides);
	suiHTML.innerHTML = sui;
	
	const netHTML = document.getElementById("networkhacks");
	let net = JSON.stringify(rawStats.networkHacks);
	netHTML.innerHTML = net;
	
	const steamHTML = document.getElementById("steam");
	let steam = "<a href=https://steamcommunity.com/profiles/"+steamId+" target=_blank>Steam</a>";
	steamHTML.innerHTML = steam;
	
	const timeHTML = document.getElementById("time");
	let time = JSON.stringify(rawStats.timePlayed);
	//neaten that fuck up
	
	timeHTML.innerHTML = neatenTime(time);
	
	
	const level = document.getElementById("level");
	level.innerHTML = JSON.stringify(rawStats.level);
	
	const name = document.getElementById("name");
	name.innerHTML = JSON.stringify(rawMisc.name).slice(1,-1);
	
	const picHTML = document.getElementById("pic");
	picHTML.innerHTML = "<img width=275px height=275px border-radius=15px src="+pic+"></img>";
	
	let role = document.getElementById("role");
	let roleOops = "";
	const ROLE = String(JSON.stringify(rawMisc.role).slice(1,-1));
	switch (ROLE){
		case "AUG":
			roleOops = "<div class=aug>AUG</div>";
			break;
		case "Developer":
			roleOops = "<div class=developer>Developer</div>";
			break;
		case "Demoted":
			roleOops = "<div class=demoted>Demoted</div>";
			const timeDemotedHTML = document.getElementById("demotedTime");
			let timeDemoted = JSON.stringify(rawStats.timePlayedDemoted);
			timeDemotedHTML.innerHTML = neatenTime(timeDemoted);
			const dem = document.getElementById("dem");
			dem.style.display = "block";
			break;
		default:
			roleOops = "<div class=agent>Agent</div>";
			break;
	}
	role.innerHTML = roleOops;

	//better planning, management and in general actually doing this as a project, i couldve
	//saved myself so many man hours
	//TIME TO GO INSANE YUISAGFDFYOUGIOFUIYGASOIUGYFSA
	//big list is an array of arrays, the basic arrays are HTML ID, intruder stat.something
	let bigList = [["killsRank","stats.kills"],["arrestsRank","stats.arrests"],["deathsRank","stats.deaths"],["mwonRank","stats.matchesWon"],["mlostRank","stats.matchesLost"],["healsRank","stats.heals"],["gothealedRank","stats.gotHealed"],["teamkillsRank","stats.teamKills"],["teamdamageRank","stats.teamDamage"],["teamknockdownsRank","stats.teamknockdowns"],["capturesRank","stats.captures"],["pickupsRank","stats.pickups"],["survivalsRank","stats.survivals"],["suicidesRank","stats.suicides"],["networkhacksRank","stats.networkHacks"]];
	for (let item in bigList){
		bigList[item].push(steamId);
	}
	
	updateAllRank(bigList);

}
async function returnOneRank(thing){
	const randomHTML = document.getElementById(thing[0]);
	randomHTML.innerHTML = "<img width=5px height=5px src=/assets/loading.gif></img>";
	let randomRank = await findYourLeaderboardPosition(thing[2],thing[1]);
	let colouredRank = giveRankColour(randomRank);
	//randomHTML.innerHTML = colouredRank;
	return colouredRank;
}
async function updateAllRank(things){
	const somethings = things.map(returnOneRank);
	const ranks = await Promise.all(somethings);
	for (let item in things){
		let randomHTML = document.getElementById(things[item][0]);
		randomHTML.innerHTML = ranks[item];
	}
}
function giveRankColour(number){
	switch (number){
		case "1st":
			return "<div class=winner>1st</div>";
		case "2nd":
			return "<div class=secondPlace>2nd</div>";
		case "3rd":
			return "<div class=thirdPlace>3rd</div>";
		default:
			return "<div class=loser>"+number+"</div>";
	}
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
	const vet = document.getElementById("veteran");
	vet.style.display="none"
	
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
// ---- COMBAT STATS WHEEL ----
const combatCtx = document.getElementById("combatWheel");

new Chart(combatCtx, {
    type: "doughnut",
    data: {
        labels: ["Kills", "Arrests", "Got Arrested", "Deaths"],
        datasets: [{
            data: [
                120, // kills
                45,  // arrests
                12,  // got arrested
                30   // deaths
            ],
            backgroundColor: [
                "#e74c3c",
                "#3498db",
                "#f1c40f",
                "#7f8c8d"
            ],
            borderWidth: 0
        }]
    },
    options: {
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    }
});


// ---- VOTE STATS WHEEL ----
const voteCtx = document.getElementById("voteWheel");

new Chart(voteCtx, {
    type: "doughnut",
    data: {
        labels: ["Your Votes", "Upvotes", "Downvotes"],
        datasets: [{
            data: [
                20, // votes you gave
                85, // upvotes received
                15  // downvotes received
            ],
            backgroundColor: [
                "#9b59b6",
                "#2ecc71",
                "#e74c3c"
            ],
            borderWidth: 0
        }]
    },
    options: {
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    }
});

