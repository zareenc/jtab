// When new tab is created, add tab info to localStorage
chrome.tabs.onCreated.addListener(newTabCallback);

// When URL is updated, delete duplicate tabs
chrome.tabs.onUpdated.addListener(pageUpdateCallback);

// When tab is deleted, remove tab info from localStorage
chrome.tabs.onRemoved.addListener(deleteTabCallback);

// Toggle pinning and unpinning with Omnibox icon
chrome.browserAction.onClicked.addListener(pinCallback);