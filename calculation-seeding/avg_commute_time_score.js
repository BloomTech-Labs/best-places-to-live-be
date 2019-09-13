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
      case rounded_avg_commute_time <= 26:
        score = "B";
        break;
      case rounded_avg_commute_time <= 32:
        score = "C";
        break;
      case rounded_avg_commute_time <= 38:
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
          avg_commute_time_score: score,
          "grade_business_freedom":       await calculateGrading(city.score_business_freedom,       [7.1,6.5,6.1,5.5]),
          "grade_commute":                await calculateGrading(city.score_commute,                [7.1,6.5,6.1,5.5]),
          "grade_cost_of_living":         await calculateGrading(city.score_cost_of_living,         [7.1,6.5,6.1,5.5]),
          "grade_economy":                await calculateGrading(city.score_economy,                [7.1,6.5,6.1,5.5]),
          "grade_education":              await calculateGrading(city.score_education,              [7.1,6.5,6.1,5.5]),
          "grade_environmental_quality":  await calculateGrading(city.score_environmental_quality,  [7.1,6.5,6.1,5.5]),
          "grade_healthcare":             await calculateGrading(city.score_healthcare,             [7.1,6.5,6.1,5.5]),
          "grade_housing":                await calculateGrading(city.score_housing,                [7.1,6.5,6.1,5.5]),
          "grade_internet_access":        await calculateGrading(city.score_internet_access,        [7.1,6.5,6.1,5.5]),
          "grade_leisure_&_culture":      await calculateGrading(city["score_leisure_&_culture"],   [7.1,6.5,6.1,5.5]),
          "grade_outdoors":               await calculateGrading(city.score_outdoors,               [7.1,6.5,6.1,5.5]),
          "grade_safety":                 await calculateGrading(city.score_safety,                 [7.1,6.5,6.1,5.5]),
          "grade_startups":               await calculateGrading(city.score_startups,               [7.1,6.5,6.1,5.5]),
          "grade_taxation":               await calculateGrading(city.score_taxation,               [7.1,6.5,6.1,5.5]),
          "grade_tolerance":              await calculateGrading(city.score_tolerance,              [7.1,6.5,6.1,5.5]),
          "grade_total":                  await calculateGrading(city.score_total,                  [7.1,6.5,6.1,5.5]),
          "grade_travel_connectivity":    await calculateGrading(city.score_travel_connectivity,    [7.1,6.5,6.1,5.5]),
          "grade_venture_capital":        await calculateGrading(city.score_venture_capital,        [7.1,6.5,6.1,5.5])
        }
      }
    );

    documentsUpdated++;

    //console.log(updatedCity);
    console.log(documentsUpdated);
  });
});


function calculateGrading(get, limits) // whereas get is the data being tested and limits is the values at which each grade chages must me length 4 [A,B,C,D]
{
  if(!get || parseFloat(get) === 0 || limits.length < 4) return "N/A"; //if we get a 0 or null then the data must not be avalible
  switch(true)
  {
    case get >= limits[0]:
      return "A";
    case get >= limits[1]:
      return "B";
    case get >= limits[2]:
      return "C";
    case get >= limits[3]:
      return "D"
    default:
      return "F"
  }
}