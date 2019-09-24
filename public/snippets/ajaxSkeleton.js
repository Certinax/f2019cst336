$.ajax({
  url: "",
  data: {
    id: 123
  },
  type: "GET",
  dataType: "json",
  success: function(json) {
    $("<h1>")
      .text(json.title)
      .appendTo("body");
    $('<div class="content">')
      .html(json.html)
      .appendTo("body");
  },
  error: function(xhr, status, errorThrown) {
    alert("Sorry, where was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
  },
  complete: function(xhr, status) {
    alert("The request is complete!");
    console.log(status);
  }
});
