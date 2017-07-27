function closeTab(tab) {
	chrome.tabs.remove(tab.id);
}

function newTabCallback(tab){
	var currentTabs = localStorage.getObject('tabs');
	if(currentTabs === null){
		currentTabs = [];
	}
	var currentTime = Date.now();
	tab.createdAt = currentTime;
	tab.updatedAt = currentTime;
	currentTabs.push(tab)
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

function getAllTabs(tab){
	return localStorage.getObject('tabs') || [];
}

