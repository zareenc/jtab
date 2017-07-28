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
