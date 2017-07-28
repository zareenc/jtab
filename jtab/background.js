// When new tab is created, add tab info to localStorage
chrome.tabs.onCreated.addListener(newTabCallback);

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
