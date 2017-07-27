chrome.browserAction.onClicked.addListener(pinCallback);

chrome.tabs.onCreated.addListener(newTabCallback);
