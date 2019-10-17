function Person() {
  this.name = "Thora";
  this.age = 26;
}

Person.prototype.gender = {
  gender: "female"
};

module.exports = Person;
