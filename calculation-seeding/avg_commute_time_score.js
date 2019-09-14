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

  Object.keys(deviations).map(k =>  
    deviations[k] =  {sd : standarddeviations(deviations[k]), avg: average(deviations[k]) }
    )
  

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
    
    let object = {};
    Object.keys(deviations).map(k =>{
        let sd =  deviations[k].sd;
        let avg = deviations[k].avg;
          object[k] = (GetZPercent(city[k], avg, sd))*10 + (city[k] > avg ? 0.05 : 0); //to make from 0-1 to 0-10;
          let nk = k.split("score_").join("grade_");
          object[nk] = calculateGrading(city[k],[sd*1.5+avg, sd*1+avg, avg, -sd*1+avg]);
        }
    );
    const updatedCity = await City.findOneAndUpdate(
      { name: city.name },
      {
        $set: {
          ...object,
          avg_commute_time: rounded_avg_commute_time,
          avg_commute_time_score: score
         /*  grade_business_freedom: await calculateGrading(city.score_business_freedom, deviations.score_business_freedom
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
          ) */
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

function GetZPercent(val, mean, sd) {
  let z = (val-mean)/sd;
  // z == number of standard deviations from the mean

  // if z is greater than 6.5 standard deviations from the mean the
  // number of significant digits will be outside of a reasonable range

  if (z < -6.5) {
    return 0.0;
  }

  if (z > 6.5) {
    return 1.0;
  }

  var factK = 1;
  var sum = 0;
  var term = 1;
  var k = 0;
  var loopStop = Math.exp(-23);

  while(Math.abs(term) > loopStop) {
    term = .3989422804 * Math.pow(-1,k) * Math.pow(z,k) / (2 * k + 1) / Math.pow(2,k) * Math.pow(z,k+1) / factK;
    sum += term;
    k++;
    factK *= k;
  }

  sum += 0.5;

  return sum;
}
