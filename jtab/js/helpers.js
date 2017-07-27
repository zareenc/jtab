function closeTab(tabId) {
	chrome.tabs.remove(tabId)
}

function getTabUrls() {
	chrome.tabs.query({},function(tabs){     
		console.log("\n/////////////////////\n");
		tabs.forEach(function(tab){
			console.log(tab.url);
		});
	});	
}
