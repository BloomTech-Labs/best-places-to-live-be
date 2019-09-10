require("dotenv").config();
const mongoose = require("mongoose");
const keys = require("../config/keys");
const City = require("../models/city");

mongoose
  .connect(keys.mongodb.dbURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected."))
  .catch(e => console.error(`Could not connect: ${e.message}`));

City.find().then(cities => {
  let documentsUpdated = 0;
  cities.map(async city => {
    const rounded_avg_commute_time = Math.round(city.avg_commute_time);
    let score = "";

    switch (true) {
      case rounded_avg_commute_time <= 20:
        score = "A";
        break;
      case rounded_avg_commute_time > 20 && rounded_avg_commute_time <= 26:
        score = "B";
        break;
      case rounded_avg_commute_time > 26 && rounded_avg_commute_time <= 32:
        score = "C";
        break;
      case rounded_avg_commute_time > 32 && rounded_avg_commute_time <= 38:
        score = "D";
        break;
      default:
        score = "F";
        break;
    }

    const updatedCity = await City.findOneAndUpdate(
      { name: city.name },
      {
        $set: {
          avg_commute_time: rounded_avg_commute_time,
          avg_commute_time_score: score
        }
      }
    );

    documentsUpdated++;

    console.log(updatedCity);
    console.log(documentsUpdated);
  });
});
