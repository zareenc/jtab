var bg = chrome.extension.getBackgroundPage();

$(document).ready(function() {
  // load existing options
  options = bg.getOptions()
  for (var k in options) {
    $("#" + k).attr("checked", options[k])
  }

  // create checkbox change listeners
  checkbox_ids = [
    "close_dup_tabs",
    "close_old_tabs",
  ]
  for (var i = 0; i < checkbox_ids.length; i++) {
    $("#" + checkbox_ids[i]).on("change", function() {
      bg.setOption(this.id, this.checked)
    })
  }
})
