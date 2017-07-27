// When new tab is created, add tab info to localStorage
chrome.tabs.onCreated.addListener(newTabCallback);

// When navigate to new URL, delete duplicate tabs

// When tab is deleted, remove tab info from localStorage

// Toggle pinning and unpinning with Omnibox icon
chrome.browserAction.onClicked.addListener(pinCallback);