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

function deleteTab(tabId) {
	tabs = getAllTabs();
	delete tabs[tabId]
	localStorage.setObject('tabs', tabs);
}