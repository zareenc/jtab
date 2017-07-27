chrome.browserAction.onClicked.addListener(function(tab) {
	pinTab
});

chrome.tabs.onCreated.addListener(newTabCallback);
