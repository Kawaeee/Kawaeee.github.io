import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import Particles from "vue3-particles";

import "./assets/main.css"

const app = createApp(App)

// According to this issue: https://github.com/tsparticles/vue3/issues/11
app.use(router)
Particles(app, {})

app.mount("#app")
