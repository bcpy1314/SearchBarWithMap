const axios = require("axios");
require("dotenv").config();

module.exports = async (input) => {
  const response = await axios(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(regions)&components=country:us&key=AIzaSyC0_7qBQT6uvcgQ_zqcnO8KeFufZhbCDCo`
  );
  const results = response.data.predictions;
  const array = results.map((result) => {
    return result.description;
  });
  return array;
};
