var bg = chrome.extension.getBackgroundPage();

$(document).ready(function() {
  // load existing options
  options = bg.getOptions()
  for (var k in options) {
    switch(k) {
      case "close_dup_tabs":
        $("#" + k).val(options[k]["type"])
        break;
      case "close_old_tabs":
        $("#" + k).val(options[k]["type"])
        break;
      case "recycle_tabs":
        $("#" + k).val(options[k]["type"])
        break;
    }
  }
  $("#close_old_tabs\\.age").val(bg.getOption(document.getElementById("close_old_tabs.age").id))
  $("#close_old_tabs\\.count").val(bg.getOption(document.getElementById("close_old_tabs.count").id))


  // Dup tabs
  console.log($("#close_dup_tabs").value)
  $("#close_dup_tabs").on("change", function() {
    bg.setOption(this.id, this.options[this.selectedIndex].value)
  })

  // Old tabs
  $("#close_old_tabs").on("change", function() {
    optv = this.options[this.selectedIndex].value
    bg.setOption(this.id, optv)
  })
  // $("#close_old_tabs\\.age").val(bg.getOption(this.id))
  $("#close_old_tabs\\.age").on("change", function() {
    if (parseInt(this.value) >= 0) {
      bg.setOption(this.id, this.value)
    }
  })
  // $("#close_old_tabs\\.count").val(bg.getOption(this.id))
  $("#close_old_tabs\\.count").on("change", function() {
    if (parseInt(this.value) >= 0) {
      bg.setOption(this.id, this.value)
    }
  })

  //Recycle tabs
  $("#recycle_tabs").on("change", function() {
    bg.setOption(this.id, this.options[this.selectedIndex].value)
  })
})
