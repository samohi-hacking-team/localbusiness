//Etsy BLM Integration

function post(url, data) {
  return fetch(url, {method: "POST",headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
}

function addBadges(x){
	text= $(x).text();
	$(x).addClass("stay-local-badged");
	post("https://us-central1-local-businesss.cloudfunctions.net/checkBusiness",{url: text}).then((o) => o.json()).then(function(list){
		console.log(list)
		if (list.exists){
			if (list.categories.includes("BLM")){
				console.log("blm")
				$(x).after('<img src="'+chrome.runtime.getURL("0.png")+'" style="width:2em;height:2em;vertical-align:middle;float:right">');
			}
		}
	});
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