function closeTab(tab) {
	chrome.tabs.remove(tab.id);
}

function newTabCallback(tab){
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

function pinTab(tab) {
  console.log('Pinning tab: ' + tab.url);
  var storageVal = {'pinned': 'True'}
  localStorage.setItem(tab.id, storageVal)
  console.log('Pinned tab: ' + localStorage[tab.id])
}

function unpinTab(tab) {
  console.log('Unpinning tab: ' + tab.url);
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
}

function getTabById(tabId){
	return getAllTabs()[tabId]
}

function getAllTabs(){
	return localStorage.getObject('tabs') || {};
}

function setTabKey(tabId, key, value){
	var tabs = getAllTabs()
	tabs[tabId][key] = value;
	localStorage.setObject('tabs', tabs);
}