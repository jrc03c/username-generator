const { createApp } = require("vue")
const createVueComponentWithCSS = require("@jrc03c/vue-component-with-css")
const generateUsername = require("./generate-username")

const css = /* css */ ``

const template = /* html */ `
  <div class="main">
    <p class="output">{{ username }}</p>
    <button @click="generate">Generate</button>
  </div>
`

const app = createApp(
  createVueComponentWithCSS({
    template,

    data() {
      return {
        css,
        username: "",
      }
    },

    methods: {
      generate() {
        // eslint-disable-next-line no-undef
        this.username = generateUsername()
      },
    },

    mounted() {
      this.generate()
    },
  })
)

app.mount("#app")
