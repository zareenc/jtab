Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

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