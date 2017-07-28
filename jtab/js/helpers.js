/* Gets all options from local storage
 * :return: associative array of options
 */
function getOptions() {
  if ("options" in localStorage) {
    return JSON.parse(localStorage["options"])
  } else {
    return {}
  }
}

/* Save option in local storage
 *  :param option string: option name/key
 *  :param value: option value
 */
function setOption(option, value) {
  options = getOptions()
  options[option] = value
  localStorage["options"] = JSON.stringify(options)
}

/* Gets an option from local storage
 *  :param option string: option name/key
 *  :return: option value or undefined, if does not exist
 */
function getOption(option) {
  options = getOptions()
  return options[option]
}

function newTabCallback(tab) {
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

function closeTab(tab) {
	chrome.tabs.remove(tab.id);
	deleteTabCallback(tab.id);
}

function deleteTabCallback(tabId) {
	deleteTab(tabId);
}

// Pinning and unpinning functions
function pinCallback(tab) {
	if (getTabById(tab.id) !== undefined && getTabKey(tab.id,'pinned')) {
		console.log("Unpinning");
		unpinTab(tab);
	} else {
		console.log("Pinning");
		pinTab(tab);
	}
}

function pinTab(tab) {
  console.log('Pinning tab: ' + tab.url);
  if (getTabById(tab.id) === undefined) {
  	newTabCallback(tab);
  }
  setTabKey(tab.id, 'pinned', true);
}

function unpinTab(tab) {
  console.log('Unpinning tab: ' + tab.url);
  setTabKey(tab.id, 'pinned', false);
}

// Navigation to URL
function pageUpdateCallback(tabId, changeInfo, tab) {
	console.log("Tab checking duplicate for: " + tab.url);
	chrome.tabs.query({url: tab.url}, function(results) {
		removeDuplicate(results, tabId);
	});
}

function removeDuplicate(results, tabId) {
	for (i = 0; i < results.length; i++) {
		tab = results[i];
		pinned = getTabKey(tab.id, "pinned");
		if (tab.id !== tabId && pinned === false) {
			console.log("Duplicate tab: " + tab.id + " " + tab.url);
			closeTab(tab);
		}
	}
}