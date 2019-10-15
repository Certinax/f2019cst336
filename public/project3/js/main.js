const client_id = "e5c20896480942fa8a494e13a8cd5c1c";

$(function() {
  $("#year").html(new Date().getFullYear());

  accessSpotify();
});

function accessSpotify() {
  $.ajax({
    url: "https://accounts.spotify.com/authorize",
    type: "GET", // Can also use POST
    dataType: "jsonp", // XML is also viable
    data: {
      client_id: client_id,
      response_type: "token",
      redirect_uri:
        "http://certinax-f2019cst336.herokuapp.com/project3/callback/"
    },
    success: function(result, status) {
      console.log(result); // Data from API
      console.log(status); // Statuscode from API
    }
  });
}
