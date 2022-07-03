import { createApp } from "vue";
import App from "./App.vue";
import VueGoogleMaps from "vue3-google-map";

const app = createApp(App);
app
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyC0_7qBQT6uvcgQ_zqcnO8KeFufZhbCDCo",
    },
  })
  .mount("#app");
