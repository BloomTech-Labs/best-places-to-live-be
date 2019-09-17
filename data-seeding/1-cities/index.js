dataUsa = require("./data");

//code removed we dont need to check if the data is unique python already checked this.
/* const toSeed = [];

const uniqueCities = dataUsa.data.reduce((result, current) => {
  const foundCity = result.find(item => item.name === current.name);
  if (foundCity === undefined) {
    return result.concat([current]);
  } else {
    return result;
  }
}, []);

uniqueCities.forEach(item => {
  delete item.Year;
  delete item["Slug Place"];
  delete item["ID Year"];
  delete item["ID Place"];
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

uniqueCities.forEach(city => {
  toSeed.push(city);
}); */

module.exports = dataUsa[0][0];
