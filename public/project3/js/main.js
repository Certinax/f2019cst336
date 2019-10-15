const client_id = "b1bbc530a9bf4d36a3bd566647a16c7f";
const pair = "SOzeo5jmshOWvrPCbXvUZM7wTzDWrb6C";
const BASE_URL = "https://eu.api.blizzard.com/wow/";
var accessToken = "";
var tokenType = "";

$(function() {
  $("#year").html(new Date().getFullYear());

  accessBlizzard();
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
      accessToken = result.access_token;
      tokenType = result.tokenType;
      getEuRealms();
      prepDefaultSearch();
    }
  });
}

function blizzardToken() {
  return $.ajax({
    url: "https://eu.battle.net/oauth/token",
    type: "POST",
    dataType: "json",
    data: {
      client_id: client_id,
      client_secret: pair,
      grant_type: "client_credentials"
    }
  });
}

async function prepDefaultSearch() {
  const mezzo = await getCharacterMedia("mezzoforte", "grim-batol");
  $("#mezzopic").attr("src", mezzo.avatar_url);
  const orih = await getCharacterMedia("orihgas", "grim-batol");
  $("#orihpic").attr("src", orih.avatar_url);
}

function getEuRealms() {
  $.ajax({
    url: BASE_URL + "realm/status",
    type: "GET",
    dataType: "json",
    data: {
      locale: "en_GB",
      access_token: accessToken
    },
    success: function(result, status) {
      $("#realms").html("<option> Select One </option>");
      for (let i = 0; i < result.realms.length; i++) {
        $("#realms").append(
          `<option value=${result.realms[i].slug}>` +
            result.realms[i].name +
            "</option>"
        );
      }
    }
  });
}

async function getCharacterMedia(name, server) {
  const blizz = await blizzardToken();
  const accessToken = blizz.access_token;
  return $.ajax({
    url: `https://eu.api.blizzard.com/profile/wow/character/${server}/${name}/character-media`,
    type: "GET",
    dataType: "json",
    data: {
      namespace: "profile-eu",
      locale: "en_GB",
      access_token: accessToken
    }
  });
}

async function getCharacterInfo(name, server) {
  const blizz = await blizzardToken();
  const accessToken = blizz.access_token;
  return $.ajax({
    url: `https://eu.api.blizzard.com/profile/wow/character/${server}/${name}`,
    type: "GET",
    dataType: "json",
    data: {
      namespace: "profile-eu",
      locale: "en_GB",
      access_token: accessToken
    }
  });
}

$("#search").on("click", async function() {
  let name = $("#characterSearch")
    .val()
    .toLowerCase()
    .trim();
  let realm = $("#realms").val();
  const media = await getCharacterMedia(name, realm);
  const info = await getCharacterInfo(name, realm);
  buildProfile(media, info);
});

$("#mezzoforte").on("click", async function() {
  const media = await getCharacterMedia("mezzoforte", "grim-batol");
  const info = await getCharacterInfo("mezzoforte", "grim-batol");
  buildProfile(media, info);
});

$("#orihgas").on("click", async function() {
  const media = await getCharacterMedia("orihgas", "grim-batol");
  const info = await getCharacterInfo("orihgas", "grim-batol");
  buildProfile(media, info);
});

function buildProfile(media, info) {
  $("#profile").empty();
  $("<div></div>", {
    id: media.character.id,
    class: "card mb-3 shadow-sm"
  }).appendTo("#profile");
  $("<img/>", {
    src: media.render_url,
    class: "card-img-top",
    alt: "profilepic"
  }).appendTo(`#${media.character.id}`);
  $("<div></div>", {
    id: "profileBody",
    class: "card-body"
  }).appendTo(`#${media.character.id}`);
  $("<h6></h6>", {
    html: media.character.name,
    class: "mb-0 pb-0"
  }).appendTo("#profileBody");
  $("<small></small>", {
    html: info.active_title.name,
    class: "mt-0 pt-0"
  }).appendTo("#profileBody");
  $("<div></div>", {
    id: "profilerow",
    class: "row mt-2"
  }).appendTo("#profileBody");
  $("<p></p>", {
    html:
      info.guild.name +
      "<br/>" +
      info.race.name +
      " " +
      info.character_class.name,
    class: "card-text col-sm-4"
  }).appendTo("#profilerow");
  $("<p></p>", {
    html: "Level: " + info.level + "<br/>" + "Spec: " + info.active_spec.name,
    class: "card-text col-sm-4"
  }).appendTo("#profilerow");
  $("<p></p>", {
    html: "Achievements: " + info.achievement_points,
    class: "card-text col-sm-4"
  }).appendTo("#profilerow");
}
