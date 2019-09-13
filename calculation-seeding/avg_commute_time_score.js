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
  let deviations = {
    score_business_freedom: [ ],
    score_commute: [ ],
    score_cost_of_living: [ ],
    score_economy: [ ],
    score_education: [ ],
    score_environmental_quality: [ ],
    score_healthcare: [ ],
    score_housing: [ ],
    score_internet_access: [ ],
    "score_leisure_&_culture": [ ],
    score_outdoors: [ ],
    score_safety: [ ],
    score_startups: [ ],
    score_taxation: [ ],
    score_tolerance: [ ],
    score_total: [ ],
    score_travel_connectivity: [ ],
    score_venture_capital: [ ]
  }
  cities.map( c => {
    Object.keys(deviations).map(k =>  
    deviations[k].push(c[k])
    )
  })
  Object.keys(deviations).map(k =>{
      let sd = standarddeviations(deviations[k])
      deviations[k] = [sd*4, sd*3, sd*2, sd*1]; //so sd*4 is sd2 sd*3 is sd1 sd*2 is avg sd*1 is sd-1
    }
  );

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
          grade_business_freedom: await calculateGrading(city.score_business_freedom, deviations.score_business_freedom
          ),
          grade_commute: await calculateGrading(city.score_commute, deviations.score_commute),
          grade_cost_of_living: await calculateGrading(
            city.score_cost_of_living,
            deviations.score_cost_of_living
          ),
          grade_economy: await calculateGrading(city.score_economy, deviations.score_economy),
          grade_education: await calculateGrading(city.score_education, deviations.score_education),
          grade_environmental_quality: await calculateGrading(
            city.score_environmental_quality,
            deviations.score_environmental_quality
          ),
          grade_healthcare: await calculateGrading(
            city.score_healthcare,
            deviations.score_healthcare
          ),
          grade_housing: await calculateGrading(city.score_housing, deviations.score_housing),
          grade_internet_access: await calculateGrading(
            city.score_internet_access,
            deviations.score_internet_access
          ),
          "grade_leisure_&_culture": await calculateGrading(
            city["score_leisure_&_culture"],
            deviations["score_leisure_&_culture"]
          ),
          grade_outdoors: await calculateGrading(city.score_outdoors, deviations.score_outdoors),
          grade_safety: await calculateGrading(city.score_safety, deviations.score_safety),
          grade_startups: await calculateGrading(city.score_startups, deviations.score_startups),
          grade_taxation: await calculateGrading(city.score_taxation, deviations.score_taxation),
          grade_tolerance: await calculateGrading(city.score_tolerance, deviations.score_tolerance),
          grade_total: await calculateGrading(city.score_total, deviations.score_total),
          grade_travel_connectivity: await calculateGrading(
            city.score_travel_connectivity,
            deviations.score_travel_connectivity
          ),
          grade_venture_capital: await calculateGrading(
            city.score_venture_capital,
            deviations.score_venture_capital
          )
        }
      }
    );

    documentsUpdated++;

    //console.log(updatedCity);
    console.log(documentsUpdated);
  });
});

function calculateGrading(get, deviationss) {
  // whereas get is the data being tested and deviationss is the values at which each grade chages must me length 4 [A,B,C,D]
  if (!get || parseFloat(get) === 0 || deviationss.length < 4) return "N/A"; //if we get a 0 or null then the data must not be avalible
  switch (true) {
    case get >= deviationss[0]:
      return "A";
    case get >= deviationss[1]:
      return "B";
    case get >= deviationss[2]:
      return "C";
    case get >= deviationss[3]:
      return "D";
    default:
      return "F";
  }
}



function standarddeviations(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}