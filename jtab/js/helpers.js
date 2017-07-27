function closeTab(tab) {
	chrome.tabs.remove(tab.id);
}

function newTabCallback(tab){
	var currentTabs = localStorage.getObject('tabs');
	if(currentTabs === null){
		currentTabs = [];
	}
	var currentTime = Date.now();
	tab.createdAt = currentTime;
	tab.updatedAt = currentTime;
	currentTabs.push(tab)
	localStorage.setObject('tabs', currentTabs);
}

function getAllTabs(tab){
	return localStorage.getObject('tabs') || [];
}

