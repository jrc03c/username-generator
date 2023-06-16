const { camelify } = require("@jrc03c/js-text-tools")
const { random } = require("@jrc03c/js-math-tools")
const words = require("./words")

function capitalize(x) {
  x = x.toString()
  return x[0].toUpperCase() + x.slice(1)
}

function pickRandomFrom(x) {
  return x[Math.floor(random() * x.length)]
}

function generateUsername() {
  const { adjectives, nouns } = words
  const adjective = camelify(pickRandomFrom(adjectives))
  const noun = camelify(pickRandomFrom(nouns))

  const number = random()
    .toFixed(1 + Math.floor(random() * 4))
    .split(".")[1]

  return capitalize(adjective) + capitalize(noun) + number
}

if (typeof module !== "undefined") {
  module.exports = generateUsername
}

if (typeof window !== "undefined") {
  window.generateUsername = generateUsername
}
