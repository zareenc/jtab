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

// When new tab is created, add tab info to localStorage
chrome.tabs.onCreated.addListener(newTabCallback);

// When URL is updated, delete duplicate tabs
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.url !== undefined && getOption('close_dup_tabs')) {
		pageUpdateCallback(tabId, changeInfo, tab);
	}
});

// When tab is deleted, remove tab info from localStorage
chrome.tabs.onRemoved.addListener(deleteTabCallback);

// Toggle pinning and unpinning with Omnibox icon
chrome.browserAction.onClicked.addListener(pinCallback);
