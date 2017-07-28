///////////////////////////////////////
// Tab creation and deletion functions
///////////////////////////////////////

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

function closeTab(tab) {
	chrome.tabs.remove(tab.id);
	deleteTabCallback(tab.id);
}

function deleteTabCallback(tabId) {
	deleteTab(tabId);
}

////////////////////////////////////
// Pinning and unpinning functions
////////////////////////////////////

function pinCallback(tab) {
	if (getTabById(tab.id) !== undefined && getTabKey(tab.id,'pinned')) {
		console.log("Unpinning");
		unpinTab(tab);
		getDuplicateTabs(tab);
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
  chrome.browserAction.setIcon({path: "/images/icon-jtab.png"});
}

function unpinTab(tab) {
  console.log('Unpinning tab: ' + tab.url);
  setTabKey(tab.id, 'pinned', false);
  chrome.browserAction.setIcon({path: "/images/icon-jtab-disabled.png"});
}

//////////////////////
// Deduping functions
//////////////////////

function getDuplicateTabs(tab) {
	console.log("Checking tab duplicates for: " + tab.url);
	chrome.tabs.query({url: tab.url}, function(results) {
		removeDuplicateTabs(results, tab.id);
	});
}

function removeDuplicateTabs(results, tabId) {
	for (i = 0; i < results.length; i++) {
		tab = results[i];
		pinned = getTabKey(tab.id, "pinned");
		if (tab.id !== tabId && pinned === false) {
			console.log("Duplicate tab: " + tab.id + " " + tab.url);
			closeTab(tab);
		}
	}
}

////////////////////////////////////
// Removing old tabs functions
////////////////////////////////////

function checkNumTabs(maxTabs) {
	chrome.tabs.query({currentWindow: true}, function(results) {
		if (results.length >= maxTabs) {
			deleteOldTabs(maxTabs);
		}
	})
}

function deleteOldTabs(maxTabs) {
	console.log('Deleting old tabs');
	// TODO: implement LRU deleting
}
