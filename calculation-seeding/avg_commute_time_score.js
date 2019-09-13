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
/*           "grade_business_freedom":       calculateGrading(city.grade_business_freedom,       [0.71,0.65,0.61,0.55]),
          "grade_commute":                calculateGrading(city.grade_commute,                [0.71,0.65,0.61,0.55]),
          "grade_cost_of_living":         calculateGrading(city.grade_cost_of_living,         [0.71,0.65,0.61,0.55]),
          "grade_economy":                calculateGrading(city.grade_economy,                [0.71,0.65,0.61,0.55]),
          "grade_education":              calculateGrading(city.grade_education,              [0.71,0.65,0.61,0.55]),
          "grade_environmental_quality":  calculateGrading(city.grade_environmental_quality,  [0.71,0.65,0.61,0.55]),
          "grade_healthcare":             calculateGrading(city.grade_healthcare,             [0.71,0.65,0.61,0.55]),
          "grade_housing":                calculateGrading(city.grade_housing,                [0.71,0.65,0.61,0.55]),
          "grade_internet_access":        calculateGrading(city.grade_internet_access,        [0.71,0.65,0.61,0.55]),
          "grade_leisure_&_culture":      calculateGrading(city["grade_leisure_&_culture"],   [0.71,0.65,0.61,0.55]),
          "grade_outdoors":               calculateGrading(city.grade_outdoors,               [0.71,0.65,0.61,0.55]),
          "grade_safety":                 calculateGrading(city.grade_safety,                 [0.71,0.65,0.61,0.55]),
          "grade_startups":               calculateGrading(city.grade_startups,               [0.71,0.65,0.61,0.55]),
          "grade_taxation":               calculateGrading(city.grade_taxation,               [0.71,0.65,0.61,0.55]),
          "grade_tolerance":              calculateGrading(city.grade_tolerance,              [0.71,0.65,0.61,0.55]),
          "grade_total":                  calculateGrading(city.grade_total,                  [0.71,0.65,0.61,0.55]),
          "grade_travel_connectivity":    calculateGrading(city.grade_travel_connectivity,    [0.71,0.65,0.61,0.55]),
          "grade_venture_capital":        calculateGrading(city.grade_venture_capital,        [0.71,0.65,0.61,0.55]) */
        }
      }
    );

    documentsUpdated++;

    console.log(updatedCity);
    console.log(documentsUpdated);
  });
});


function calculateGrading(get, limits) // whereas get is the data being tested and limits is the values at which each grade chages must me length 4 [A,B,C,D]
{
  if(!get || parseInt(get) === 0 || limits.length < 4) return "N/A"; //if we get a 0 or null then the data must not be avalible

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