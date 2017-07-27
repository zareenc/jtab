function closeTab(tabId) {
	chrome.tabs.remove(tabId)
}

function getTabUrls() {
	chrome.tabs.query({},function(tabs){     
		console.log("\n/////////////////////\n");
		tabs.forEach(function(tab){
			console.log(tab.url);
		});
	});	
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
