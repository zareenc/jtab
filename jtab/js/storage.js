//////////////////////////////////////////
// Generic local storage helper functions
/////////////////////////////////////////

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}


//////////////////////////////////////////
// Options local storage helper functions
/////////////////////////////////////////

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


//////////////////////////////////////
// Tab local storage helper functions
//////////////////////////////////////

function getTabById(tabId) {
	return getAllTabs()[tabId]
}

function getAllTabs() {
	return localStorage.getObject('tabs') || {};
}

function getTabKey(tabId, key) {
	var tab = getTabById(tabId)
	return tab[key]
}

function setTabKey(tabId, key, value) {
	var tabs = getAllTabs()
	tabs[tabId][key] = value;
	localStorage.setObject('tabs', tabs);
}

function deleteTab(tabId, windowId) {
	tabs = getAllTabs();
	delete tabs[tabId]
	localStorage.setObject('tabs', tabs);

	var tabAges = localStorage.getObject('tabAges');
	console.log("Tab ages before deleting" + tabAges);
	if (tabAges && tabAges[windowId] && tabAges[windowId].indexOf(tabId) > -1) {
		var tabAgesByWindow = tabAges[windowId];
		tabAgesByWindow.splice(tabAgesByWindow.indexOf(tabId), 1);
		tabAges[windowId] = tabAgesByWindow;
		localStorage.setObject('tabAges', tabAges);
	} 
	console.log("Tab ages after deleting " + tabAges);
}


/////////////////////////////////////////
// Tab age local storage helper functions
/////////////////////////////////////////

function getTabAges() {
	return localStorage.getObject('tabAges') || {};
}

function getWindowById(windowId) {
	var tabAges = getTabAges();
	return tabAges[windowId] || [];
}

function getTabAgeIndex(tabId, windowId) {
	var win = getWindowById(windowId);
	return win.indexOf(tabId);
}


