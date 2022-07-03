<template>
  <GoogleMap
    api-key="AIzaSyC0_7qBQT6uvcgQ_zqcnO8KeFufZhbCDCo"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Marker },
  props: {
    lat: Number,
    long: Number,
  },
  setup() {
    const center = { lat: 40, lng: -70 };
    console.log(this);
    if (this.lat) {
      console.log("can read lat value");
      center.lat = this.lat;
    }
    if (this.long) {
      console.log("can read long value");
      center.lng = this.long;
    }
    return { center };
  },
});
</script>
