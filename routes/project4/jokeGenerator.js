var oneLinerJoke = require("one-liner-joke");

module.exports = {
  joke: oneLinerJoke.getRandomJoke()
};
// function getRandomJoke() {
//   const joke = oneLinerJoke.getRandomJoke();
//   console.log(joke);
//   return joke.body;
// }

// module.exports = getRandomJoke;
