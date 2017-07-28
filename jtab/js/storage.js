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
    return localStorage.getObject("options")
  } else {
    return {}
  }
}

/* Save option in local storage
 *  :param option string: option name/key
 *  :param value: option value
 */
function setOption(option, value) {
  var options = getOptions()
  var ks = option.split(".")

  if (!(ks[0] in options)) {
    options[ks[0]] = {}
  }

  if (ks.length == 1) {
    options[option]["type"] = value
  } else {
    var v = options
    for (var i = 0; i < ks.length-1; i++) {
      if (!(ks[i] in v)) {
        v[ks[i]] = {}
      }
      v = v[ks[i]]
    }
    v[ks[ks.length-1]] = value
  }
  localStorage.setObject("options", options)
}

/* Gets an option from local storage
 *  :param option string: option name/key
 *  :return: option value or undefined, if does not exist
 */
function getOption(option) {
  var options = getOptions()
  var ks = option.split(".")

  if (ks.length == 1) {
    return option in options ? options[option]["type"] : undefined
  } else {
    var v = options
    for (var i in ks) {
      if (ks[i] in v) {
        v = v[ks[i]]
      } else {
        return undefined
      }
    }
    return v
  }
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
