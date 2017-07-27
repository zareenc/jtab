function closeTab(tabId) {
	chrome.tabs.remove(tabId);
}

function newTabCallback(tab){
	var currentTabs = localStorage.getObject('tabs');
	if(currentTabs === null){
		currentTabs = []
	}
	var currentTime = Date.now();
	tab.createdAt = currentTime;
	tab.updatedAt = currentTime;
	localStorage.setObject('tabs', tab)
}

function getAllTabs(tab){
	return localStorage.getObject('tabs') || []
}