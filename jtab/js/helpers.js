///////////////////////////////////////
// Tab creation and deletion functions
///////////////////////////////////////

function newTabCallback(tab) {
	// Add tab info to tabs key
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

function closeTab(tabId, windowId) {
	chrome.tabs.remove(tabId);
	deleteTabCallback(tabId, windowId);
}

function deleteTabCallback(tabId, windowId) {
	deleteTab(tabId, windowId);
}

////////////////////////////////////
// Pinning and unpinning functions
////////////////////////////////////

function pinCallback(tab) {
	if (getTabById(tab.id) && getTabKey(tab.id,'pinned')) {
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
		if (tab.id !== tabId && !pinned) {
			console.log("Duplicate tab: " + tab.id + " " + tab.url);
			closeTab(tab.id);
		}
	}
}

////////////////////////////////////
// Removing old tabs functions
////////////////////////////////////

function clearTabAge() {
	localStorage.setObject('tabAges', []);
}

function updateTabAge(tabId, windowId) {
	var tabAges = localStorage.getObject('tabAges');
	if (tabAges === null) {
		tabAges = {};
	}
	console.log("Tab ages before update:" + tabAges);

	var tabAgesByWindow = tabAges[windowId] || [];
	if (tabAgesByWindow.indexOf(tabId) > -1) {
		tabAgesByWindow.splice(tabAgesByWindow.indexOf(tabId), 1);
	} 
	tabAgesByWindow.splice(0, 0, tabId);
	tabAges[windowId] = tabAgesByWindow;
	localStorage.setObject('tabAges', tabAges);
	console.log("Tab ages after update:" + tabAges);
}

function deleteOldTabCallback(tab) {
	if (getOption('close_old_tabs')) {
		// TODO: first check if max tabs set in options
		var maxTabs = 10; // TODO: get max value from options
		checkNumTabs(maxTabs, tab.windowId);
	}
}

function checkNumTabs(maxTabs, windowId) {
	chrome.tabs.query({currentWindow: true}, function(results) {
		if (results.length > maxTabs) {
			deleteOldTabs(maxTabs, results, windowId);
		}
	})
}

function deleteOldTabs(maxTabs, results, windowId) {
	console.log('Deleting old tabs');
	var tabAges = localStorage.getObject('tabAges');
	if (tabAges && tabAges[windowId] && tabAges[windowId].length > maxTabs) {
		var tabAgesByWindow = tabAges[windowId];
		var i = tabAgesByWindow.length - 1;
		var numToDelete = tabAgesByWindow.length - maxTabs;
		var tabsToDelete = [];
		while (i >= 0 && tabsToDelete.length < numToDelete) {
			var pinned = getTabKey(tabAgesByWindow[i], "pinned");
			if (!pinned) {
				tabsToDelete.push(tabAgesByWindow[i]);
			}
			i--;
		}

		for (i = 0; i < tabsToDelete.length; i++) {
			closeTab(tabsToDelete[i]);
		}
		console.log("Tab ages after deleting:" + tabAges);
	}
}
