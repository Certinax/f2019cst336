module.exports = {
  stringMe: "This is a string from object",
  date: new Date().getDate(),
  isEmpty: false,
  testMe: function() {
    let a = 5;
    let b = 10;
    // console.log("Sum from testMe: ", a + b);
    return "Sum from testMe: " + `${a + b}`;
  }
};
