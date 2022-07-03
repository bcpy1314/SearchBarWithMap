<template>
  <HelloWorld
    msg="Welcome to Your Vue.js App"
    @CustomEventInputChanged="updatePlace"
  ></HelloWorld>

  <GoogleMap
    id="map"
    api-key="AIzaSyC0_7qBQT6uvcgQ_zqcnO8KeFufZhbCDCo"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script>
//import GoogleMap from "./components/GoogleMap.vue";
import HelloWorld from "./components/HelloWorld.vue";
import { GoogleMap, Marker } from "vue3-google-map";

export default {
  name: "App",

  data() {
    return {
      place: "",
      lat: 40.689247,
      long: -74.044502,
      center: { lat: 40.689247, lng: -74.044502 },
    };
  },

  components: {
    HelloWorld,
    GoogleMap,
    Marker,
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
          this.center = { lat: latitude, lng: longitude };
          console.log(this.center);
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

#map {
  margin-top: 100px;
}
</style>
