const { set, sort } = require("@jrc03c/js-math-tools")
const fs = require("fs")
const progress = require("@jrc03c/progress")
const strip = require("@jrc03c/js-text-tools/src/helpers/strip")
// const {} = require("@jrc03c/js-text-tools")

function getWords(files) {
  const words = []
  let lines = []

  files.forEach(file => {
    lines = lines.concat(fs.readFileSync(file, "utf8").split("\n"))
  })

  progress(lines).forEach(line => {
    line
      .split(",")
      .slice(1)
      .forEach(word => {
        word = strip(word.toLowerCase())

        if (word.length > 0) {
          words.push(word)
        }
      })
  })

  return sort(Array.from(new Set(words)))
}

const words = getWords(["v1/words-multiple-present-participle.csv"])
fs.writeFileSync("participles.json", JSON.stringify(words), "utf8")
console.log(words)
