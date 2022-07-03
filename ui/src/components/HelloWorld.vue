<template>
  <input
    type="text"
    v-model="input"
    placeholder="Search places..."
    @input="getData"
  />
  <div class="item place" v-for="place in items" :key="place">
    <p @click="click($event)">{{ place }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      input: "",
      items: [1, 2, 3],
    };
  },

  methods: {
    async getData() {
      try {
        let headers = new Headers({
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Origin, Methods, Content-Type",
        });
        let response = await axios.post(
          "http://localhost:3000/graphql",
          { query: '{suggestions(input:"' + this.input + '")}' },
          headers
        );
        console.log(response.data.data.suggestions.length);
        this.items = response.data.data.suggestions;
      } catch (error) {
        console.log(error);
      }
    },
    click(event) {
      const place = event.target.innerHTML;
      console.log(place);
      this.$emit("CustomEventInputChanged", place);
    },
  },
};
</script>
