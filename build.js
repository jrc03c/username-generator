const { execSync } = require("node:child_process")
const express = require("express")
const fs = require("fs")
const path = require("path")
const process = require("node:process")
const watch = require("@jrc03c/watch")

function rebuild() {
  console.log("-----")
  console.log(`Rebuilding... (${new Date().toLocaleString()})`)

  try {
    execSync(
      `npx esbuild res/js/src/main.js --bundle --outfile=res/js/bundle.js`,
      { encoding: "utf8" }
    )

    const template = fs.readFileSync("template.html", "utf8")

    const built = template.replaceAll(
      /res\//g,
      path.join(basePath, "res") + "/"
    )

    const outfile = path.join(__dirname, "index.html")
    fs.writeFileSync(outfile, built, "utf8")
    execSync(`npx prettier -w "${outfile}"`, { encoding: "utf8" })

    console.log("\nDone! 🎉\n")
  } catch (e) {
    console.error(e)
  }
}

const basePath = (() => {
  const arg = process.argv.find(a => a.includes("--base-path"))
  const index = process.argv.indexOf("-b")

  if (arg) {
    return arg.split("=").at(-1)
  } else if (index > -1) {
    return process.argv[index + 1]
  } else {
    return "."
  }
})()

if (process.argv.indexOf("-w") > -1 || process.argv.indexOf("--watch") > -1) {
  watch({
    target: ".",
    exclude: ["build.js", "bundle.js", "index.html", "node_modules"],
    created: rebuild,
    modified: rebuild,
    deleted: rebuild,
  })

  const app = express()

  app.use(
    basePath === "." ? "/" : path.join(basePath, "/"),
    express.static(".", { extensions: ["html"] })
  )

  app.listen(8000, () => {
    console.log(
      `Listening at http://localhost:8000${basePath === "." ? "" : basePath}...`
    )
  })
}

rebuild()
