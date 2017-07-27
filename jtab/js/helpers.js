function closeTab(tab) {
	chrome.tabs.remove(tab.id);
}

function newTabCallback(tab) {
	var currentTabs = localStorage.getObject('tabs');
	if(currentTabs === null){
		currentTabs = {};
	}
	var currentTime = Date.now();
	currentTabs[tab.id] = {
		createdAt: currentTime,
		updatedAt: currentTime,
		pinned: false
	};
	localStorage.setObject('tabs', currentTabs);
}

// Pinning and unpinning functions
function pinCallback(tab) {
	if (getTabById(tab.id) !== undefined && getTabKey(tab.id,'pinned') === true) {
		console.log("Unpinning");
		unpinTab(tab);
	} else {
		console.log("Pinning");
		pinTab(tab);
	}
}

function pinTab(tab) {
  console.log('Pinning tab: ' + tab.url);
  if (getTabById(tab.id) === undefined) {
  	newTabCallback(tab);
  }
  setTabKey(tab.id, 'pinned', true);
}

function unpinTab(tab) {
  console.log('Unpinning tab: ' + tab.url);
  setTabKey(tab.id, 'pinned', false);
}

// Navigation to URL
function navigateCallback(tab) {
	
}