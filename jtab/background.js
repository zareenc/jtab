// When new tab is created, add tab info to localStorage
// and delete old tabs
chrome.tabs.onCreated.addListener(function(tab) {
	newTabCallback(tab);
	updateTabAge(tab.id);
	deleteOldTabCallback(tab);
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
	updateTabAge(activeInfo.tabId);
})

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
