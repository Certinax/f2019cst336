const numOfLikes = $("#numberOfLikes");
const numOfDislikes = $("#numberOfDislikes");

// Buttons
const seeComments = $("#seeComments");
const answerQuestions = $("#answerQuestions");

const likeBtn = $("#likeBtn");
const cancelLikeBtn = $("#cancelLikeBtn");
const dislikeBtn = $("#dislikeBtn");
const cancelDislikeBtn = $("#cancelDislikeBtn");

$(function() {
  $("#year").html(new Date().getFullYear());

  updateVideoStatusNumbers();
});

function updateVideoStatusNumbers() {
  $.ajax({
    url: "https://cst336.herokuapp.com/projects/api/videoLikesAPI.php",
    type: "GET", // Can also use POST
    dataType: "json", // XML is also viable
    data: {
      videoId: "wxyH1-B4Y7s"
    },
    success: function(result, status) {
      //console.log(result); // Data from API
      //console.log(status); // Statuscode from API
      numOfLikes.html(result.likes);
      numOfDislikes.html(result.dislikes);
    }
  });
}

function updateVideoStatus(action) {
  $.ajax({
    url: "https://cst336.herokuapp.com/projects/api/videoLikesAPI.php",
    type: "GET", // Can also use POST
    dataType: "json", // XML is also viable
    data: {
      videoId: "wxyH1-B4Y7s",
      action: action
    },
    success: function(result, status) {
      //console.log(result); // Data from API
      //console.log(status); // Statuscode from API
      updateVideoStatusNumbers();
    }
  });
}

function getComments() {
  $.ajax({
    url: "https://cst336.herokuapp.com/projects/api/videoLikesAPI.php",
    type: "GET", // Can also use POST
    dataType: "json", // XML is also viable
    data: {
      videoId: "wxyH1-B4Y7s",
      action: "comments"
    },
    success: function(result, status) {
      console.log(result); // Data from API
      //console.log(status); // Statuscode from API
      result.forEach(function(person) {
        createComments(person);
      });
      //createComments(result);
    }
  });
}

// Event listeners
likeBtn.on("click", function() {
  updateVideoStatus(likeBtn.val());
});

dislikeBtn.on("click", function() {
  updateVideoStatus(dislikeBtn.val());
});

cancelLikeBtn.on("click", function() {
  updateVideoStatus(cancelLikeBtn.val());
});

cancelDislikeBtn.on("click", function() {
  updateVideoStatus(cancelDislikeBtn.val());
});

seeComments.on("click", function() {
  getComments();
});

answerQuestions.on("click", function() {
  //$("#question").css("");
  //evaluateAnswer();
  console.log("CLIK");
  $("#questionFrame").css("display", "");
});

$("#answer").on("change", function() {
  evaluateAnswer();
});

function createComments(person) {
  let commentList = document.getElementById("commentList");
  //let person = persons[0];

  //let commentList = document.createElement("div");

  let card = document.createElement("div");
  card.setAttribute("class", "card mt-2");
  commentList.appendChild(card);
  // <div class="card">
  //   <div class="card-body">
  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  card.appendChild(cardBody);
  //     <h5 class="card-title">Card title</h5>
  let cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerHTML = person.author;
  cardBody.appendChild(cardTitle);
  //     <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
  let cardDate = document.createElement("h6");
  cardDate.setAttribute("class", "card-subtitle mb-2 text-muted");
  cardDate.innerHTML = person.date;
  cardBody.appendChild(cardDate);
  //     <p class="card-text">
  let cardText = document.createElement("p");
  cardText.setAttribute("class", "card-text");
  cardText.innerHTML = person.comment;
  cardBody.appendChild(cardText);

  let stars = document.createElement("div");
  for (let i = 0; i < person.rating; i++) {
    stars.appendChild(getStars());
  }
  cardBody.appendChild(stars);
}

function getStars() {
  let ratingStar = document.createElement("img");
  ratingStar.setAttribute("src", "img/star.jpg");
  ratingStar.setAttribute("width", "20");
  ratingStar.setAttribute("height", "20");
  ratingStar.setAttribute("class", "card-link");
  return ratingStar;
}

function evaluateAnswer() {
  if ($("#answer").val() === "Training") {
    console.log("YES");
    $("#feedback").html("Correct!");
    $("#feedback").css("color", "green");
  } else {
    $("#feedback").html("Wrong!");
    $("#feedback").css("color", "red");
  }
}
