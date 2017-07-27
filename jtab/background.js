getTabUrls()
console.log('hello')

chrome.browserAction.onClicked.addListener(function(tab) {
	pinTab(tab)
});