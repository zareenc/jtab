// When new tab is created, add tab info to localStorage
chrome.tabs.onCreated.addListener(function(tab) {
	newTabCallback(tab);

	if (getOption('close_old_tabs')) {
		// TODO: first check if max tabs set in options
		var maxTabs = 10; // TODO: get max value from options
		checkNumTabs(maxTabs);
	}
});

// When tab is deleted, remove tab info from localStorage
chrome.tabs.onRemoved.addListener(deleteTabCallback);

// Delete duplicate tabs
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.url !== undefined && getOption('close_dup_tabs')) {
		getDuplicateTabs(tab);
	}
});

// Toggle pinning and unpinning tabs
chrome.browserAction.onClicked.addListener(pinCallback);
