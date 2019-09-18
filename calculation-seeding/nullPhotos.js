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
    if (city.photo === null) {
      
      const updatedCity = await City.findOneAndUpdate(
        { _id: city._id },
        {
          $set: {
            photo:
              "https://letsmovehomie-city-photoes.nyc3.digitaloceanspaces.com/no-photo-available.jpg"
          }
        }
      );
    }
    documentsUpdated++;
    //console.log(updatedCity);
    console.log(documentsUpdated);
  });
});
