/**
 * Function that accepts any html element and access the numeric value
 * @param element is any HTML-element
 * @returns any number if any, else 0
 */
function convertToNumber(element) {
  if (element.html()) {
    // return parseInt(element.html().replace(/\D/g, ""));
    return Number(element.html().replace(/[^0-9,.]+/, ""));
  }
  return 0;
}

/**
 * Basic ajax call
 */
function ajaxMe() {
  $.ajax({
    url: "",
    type: "GET", // Can also use POST
    dataType: "json", // XML is also viable
    data: {
      // Optional
      param1: "param1",
      param2: "param2"
    },
    success: function(result, status) {
      console.log(result); // Data from API
      console.log(status); // Statuscode from API
    }
  });
}
