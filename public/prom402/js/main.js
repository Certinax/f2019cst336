const weekList = $("#weeks");

$(function() {
  $("#year").html(new Date().getFullYear());

  //console.log(new Date().getWeek());

  //console.log("weeks: ", weekList[0].rows[0].id);

  showCurrentWeek();
});

const showCurrentWeek = () => {
  const currentWeek = new Date().getWeek();

  const weeks = [...weekList[0].rows];

  weeks.forEach(week => {
    const weekNumber = parseInt(week.id.replace(/\D/, ""));
    if (weekNumber == currentWeek) {
      $(`#w${weekNumber}`).css("background-color", "lightgreen");
    } else if (weekNumber == currentWeek - 1) {
      $(`#w${currentWeek - 1}`).css("background-color", "lightgreen");
    }
  });
};

Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};
