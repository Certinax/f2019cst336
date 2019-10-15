const client_id = "b1bbc530a9bf4d36a3bd566647a16c7f";
const pair = "SOzeo5jmshOWvrPCbXvUZM7wTzDWrb6C";
const BASE_URL = "https://eu.api.blizzard.com/wow/";
let accessToken = "";
let tokenType = "";

$(function() {
  $("#year").html(new Date().getFullYear());

  accessBlizzard();
  getEuRealms();
});

function accessBlizzard() {
  $.ajax({
    url: "https://eu.battle.net/oauth/token",
    type: "POST",
    dataType: "json",
    data: {
      client_id: client_id,
      client_secret: pair,
      grant_type: "client_credentials"
    },
    success: function(result, status) {
      console.log(result); // Data from API
      console.log(status); // Statuscode from API
      accessToken = result.access_token;
      tokenType = result.tokenType;
    }
  });
}

function getEuRealms() {
  $.ajax({
    url:
      BASE_URL +
      "realm/status?locale=en_GB&access_token=US3ExpbP5QIfBbxR25Xd72zYwHAzAdjqdZ",
    type: "GET",
    dataType: "json",
    data: {
      locale: "en_GB",
      access_token: accessToken
    },
    success: function(result, status) {
      console.log(result.realms[0].name);
      $("#realms").html("<option> Select One </option>");
      for (let i = 0; i < result.realms.length; i++) {
        $("#realms").append("<option>" + result.realms[i].name + "</option>");
      }
    }
  });
}

("https://eu.api.blizzard.com/profile/wow/character/grim-batol/orihgas/pvp-summary?namespace=profile-eu&locale=en_GB&access_token=US3ExpbP5QIfBbxR25Xd72zYwHAzAdjqdZ");
function getCharacterInfo() {
  $.ajax({
    //url: `https://eu.api.blizzard.com/data/wow/mount/6`,
    url:
      "https://eu.api.blizzard.com/profile/wow/character/grim-batol/orihgas/character-media",
    type: "GET",
    dataType: "json",
    data: {
      namespace: "profile-eu",
      locale: "en_GB",
      access_token: accessToken
    },
    success: function(result, status) {
      console.log(result);
      console.log(status);
    }
  });
}

$("#search").on("click", function() {
  console.log("Test");
  getCharacterInfo();
});
