<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld
    msg="Welcome to Your Vue.js App"
    @CustomEventInputChanged="updatePlace"
  ></HelloWorld>
  <GoogleMap :lati="lat" :long="long" />
</template>

<script>
import GoogleMap from "./components/GoogleMap.vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",

  data() {
    return {
      place: "",
      lat: 40.689247,
      long: -74.044502,
    };
  },

  components: {
    HelloWorld,
    GoogleMap,
  },

  methods: {
    updatePlace(currPlace) {
      this.place = currPlace;
      console.log("In main", this.place);

      // call google api
      fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          this.place +
          "&key=" +
          "AIzaSyC0_7qBQT6uvcgQ_zqcnO8KeFufZhbCDCo"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          const latitude = data.results[0].geometry.location.lat;
          const longitude = data.results[0].geometry.location.lng;
          this.lat = latitude;
          this.long = longitude;
          console.log({ latitude, longitude });
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
