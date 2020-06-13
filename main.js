//Etsy BLM Integration


//Each of these functions will eventually hold code that checks them w the api. for now it just puts each badge on each listing.
methods = [
function(username){
	return true;	
},

function(username){
	return true;
}
]

function getBadges(username){
	badges = "";
	for (var i = 0; i < methods.length; i++) {
		if(methods[i](username)){
			badges+=' <img src="'+chrome.runtime.getURL(''+i+'.png')+'" style="width:2em;height:2em;vertical-align:middle;float:right">';
		}
	}
	return badges;
}
$( "p.text-gray-lighter.text-body-smaller.display-inline-block").after(getBadges($(this).text()));
