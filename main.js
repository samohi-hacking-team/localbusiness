//Etsy BLM Integration


//Each of these functions will eventually hold code that checks them w the api. for now it just puts each badge on each listing.
methods = [
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


function addBadges(x){
	text= $(x).text();
	$(x).addClass("stay-local-badged");
	$(x).after(getBadges(text));
}

url = window.location.href;
console.log(url);
if (url.match(/https\:\/\/www\.etsy\.com\/.*/)){
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			$( "p:not(.stay-local-badged).text-gray-lighter.text-body-smaller.display-inline-block").each(function(index){addBadges(this)});
			$(":not(.stay-local-badged).shop-name-and-title-container, :not(.stay-local-badged).shop-title").each(function(index){addBadges(this)});
		}
	)});
 
	var observerConfig = {
		attributes: true, 
		childList: true, 
		characterData: true 
	};
	 

	var targetNode = document.body;
	observer.observe(targetNode, observerConfig);

}