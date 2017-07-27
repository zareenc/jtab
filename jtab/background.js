chrome.browserAction.onClicked.addListener(function(tab) {
	pinTab(tab)
});

chrome.tabs.onCreated.addListener(newTabCallback);
