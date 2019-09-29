$(function () {
    setYearInFooter();
});

const setYearInFooter = () => {
    const curDate = new Date().getFullYear();
    $("#currentDate").html(curDate);
}