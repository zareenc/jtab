function recycleTab(tabId){
	function getRecycleWindowCallback(recycleWindowId){
		chrome.tabs.move(tabId, {
			windowId: recycleWindowId,
			index: -1
		});
	}
	getRecycleWindowId(getRecycleWindowCallback);
}

function getRecycleWindowId(callbackFn){
	function newWindowCallback(windowId){
		callbackFn(windowId)
	}
	var recycleWindowId = localStorage.getObject('recycleWindow');
	if(recycleWindowId === null){
		createRecycleWindow(newWindowCallback);
		return;
	}
	chrome.windows.get(recycleWindowId, function(recycleWindow){
		if(chrome.runtime.lastError){
			createRecycleWindow(newWindowCallback);
			return;
		}
		callbackFn(recycleWindow.id);
	});
}

function createRecycleWindow(callbackFn){
	chrome.windows.create({
		state: 'minimized'
	}, function(recycleWindow){
		localStorage.setObject('recycleWindow', recycleWindow.id);
		callbackFn(recycleWindow.id);
	});
}

function getRecycledTabs(callbackFn){
	function tabQueryCallback(tabs){
		var recycledTabs = [];
		for (var i = 1; i < tabs.length; i++) {
			var tab = tabs[i];
			recycledTabs.push({
				title: tab.title,
				favIconUrl: tab.favIconUrl,
				id: tab.id,
				url: tab.url
			});
		}
		console.log(recycledTabs);
	}
	function getRecycleWindowCallback(recycleWindowId){
		chrome.tabs.query({windowId: recycleWindowId}, tabQueryCallback)
	}
	getRecycleWindowId(getRecycleWindowCallback);
}