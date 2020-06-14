//Etsy BLM Integration

function post(url, data) {
  return fetch(url, {method: "POST",headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
}

function addBadges(x, floatRight=true){
	text= $(x).text();
	$(x).addClass("stay-local-badged");
	post("https://us-central1-local-businesss.cloudfunctions.net/checkBusiness",{url: text}).then((o) => o.json()).then(function(list){
		if (list.exists){
			if (list.categories.includes("BLM")){
				$(x).after('<img src="'+chrome.runtime.getURL("0.png")+'" style="width:2em;height:2em;vertical-align:middle;'+(floatRight ? "float:right" : '')+'">');
			}
		}
	});
}

url = window.location.href;
if (url.match(/https\:\/\/www\.etsy\.com\/.*/)){
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			$( "p:not(.stay-local-badged).text-gray-lighter.text-body-smaller.display-inline-block").each(function(index){addBadges(this)});
			$(".shop-name-and-title-container>h1:not(.stay-local-badged), div.show-xs.show-sm.show-md.col-xs-12.mt-xs-1>h1:not(.stay-local-badged),text-center.mb-xs-1").each(function(index){addBadges(this,floatRight=false)});
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