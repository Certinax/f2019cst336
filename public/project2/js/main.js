// on ready function,- jQuery-way
$(function() {
  setYearInFooter();

  $("#signupForm").on("submit", function(e) {
    if (!isFormValid()) {
      e.preventDefault();
    }
  });
});

const setYearInFooter = () => {
  const curDate = new Date().getFullYear();
  $("#currentDate").html(curDate);
};

function isFormValid() {
  let valid = true;
  console.log($("#firstname").val().length);
  if ($("#firstname").val().length === 0) {
    valid = false;
    $("#firstnameError").html("*Firstname is required");
  }

  if ($("#lastname").val().length === 0) {
    valid = false;
    $("#lastnameError").html("*Lastname is required");
  }

  if ($("#email").val().length === 0) {
    valid = false;
    $("#emailError").html("*Email is required");
  }
  return valid;
}
