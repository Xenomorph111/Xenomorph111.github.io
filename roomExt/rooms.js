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
function genTrudaURL(){
	return "https://api.intruderfps.com/rooms?HideEmpty=true";
}
async function getNonEmptyRooms(){
	let roomsJunk = await fetchData(genTrudaURL());
	return roomsJunk.data;
}
async function updateWindow(){
	out = document.getElementById("sus");
	let rooms = await getNonEmptyRooms();
	let cleanText = ""
	rooms = JSON.stringify(rooms);
	cleanText = rooms.replace(',','<br>');
	sus.innerHTML = cleanText;
}
window.onload = function() {
	updateWindow();
}