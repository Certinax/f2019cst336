const name = $(".name");
const email = $(".email");
const address = $(".address");
const zip = $(".zip");
const phonenumber = $(".phonenumber");

$(function() {
  name.html($.urlParam("firstname") + " " + $.urlParam("lastname"));
  email.html($.urlParam("email"));
  address.html($.urlParam("address") + ", " + $.urlParam("zip"));
  phonenumber.html($.urlParam("phonenumber"));
  loadLogo();
  produceCard();
});

$.urlParam = function(name) {
  let results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
    window.location.href
  );
  if (results == null) {
    return null;
  }
  return decodeURIComponent(results[1]).replace(/\+/g, " ");
};

const loadLogo = () => {
  let number = Math.floor(Math.random() * 12) + 1;
  $(".business-logo").attr("src", `logos/logo${number}.svg`);
};

const produceCard = () => {
  $(".card1").css("background", cardColor());
  $(".card2").css("background", cardColor());
  $(".card3").css("background", cardColor());
};

const cardColor = () => {
  let colors = [
    "linear-gradient(to right, #0062e6, #33aeff)",
    "linear-gradient(to right, green, #f9f9f9)",
    "linear-gradient(to right, #d64a3b, #f9f9f9)",
    "green",
    "grey",
    "yellow"
  ];

  let color = Math.floor(Math.random() * colors.length);
  // $(".business-card").css("background", `${colors[color]}`);
  return `${colors[color]}`;
};
