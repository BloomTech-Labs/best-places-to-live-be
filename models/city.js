const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  //custom grades added to the model
  //>>>>>>>>>>
  grade_business_freedom: {
    type: String,
    default: null
  },
  grade_commute: {
    type: String,
    default: null
  },
  grade_cost_of_living: {
    type: String,
    default: null
  },
  grade_economy: {
    type: String,
    default: null
  },
  grade_education: {
    type: String,
    default: null
  },
  grade_environmental_quality: {
    type: String,
    default: null
  },
  grade_healthcare: {
    type: String,
    default: null
  },
  grade_housing: {
    type: String,
    default: null
  },
  grade_internet_access: {
    type: String,
    default: null
  },
  "grade_leisure_&_culture": {
    type: String,
    default: null
  },
  grade_outdoors: {
    type: String,
    default: null
  },
  grade_safety: {
    type: String,
    default: null
  },
  grade_startups: {
    type: String,
    default: null
  },
  grade_taxation: {
    type: String,
    default: null
  },
  grade_tolerance: {
    type: String,
    default: null
  },
  grade_total: {
    type: String,
    default: null
  },
  grade_travel_connectivity: {
    type: String,
    default: null
  },
  grade_venture_capital: {
    type: String,
    default: null
  },
  /// >>>>>>>

  "air-pollution-telescore": {
    type: Number,
    default: null
  },
  "airport-hub-index-detail": {
    type: Number,
    default: null
  },
  "airport-hub-telescore": {
    type: Number,
    default: null
  },
  "apartment-rent-large": {
    type: Number,
    default: null
  },
  "apartment-rent-medium": {
    type: Number,
    default: null
  },
  "apartment-rent-small": {
    type: Number,
    default: null
  },
  avg_commute_time: {
    type: Number,
    default: null
  },
  avg_commute_time_score: {
    type: String,
    default: null
  },
  "business-freedom": {
    type: Number,
    default: null
  },
  "business-freedom-telescore": {
    type: Number,
    default: null
  },
  "cleanliness-telescore": {
    type: Number,
    default: null
  },
  "company-profit-tax-rate": {
    type: Number,
    default: null
  },
  "company-profit-tax-rate-telescore": {
    type: Number,
    default: null
  },
  "consumer-price-index-telescore": {
    type: Number,
    default: null
  },
  "corruption-freedom": {
    type: Number,
    default: null
  },
  "corruption-freedom-telescore": {
    type: Number,
    default: null
  },
  "cost-apples": {
    type: Number,
    default: null
  },
  "cost-bread": {
    type: Number,
    default: null
  },
  "cost-cappuccino": {
    type: Number,
    default: null
  },
  "cost-cinema": {
    type: Number,
    default: null
  },
  "cost-fitness-club": {
    type: Number,
    default: null
  },
  "cost-import-beer": {
    type: Number,
    default: null
  },
  "cost-public-transport": {
    type: Number,
    default: null
  },
  "cost-restaurant-meal": {
    type: Number,
    default: null
  },
  "cost-taxi": {
    type: Number,
    default: null
  },
  cost_of_living: {
    type: String,
    default: null
  },
  country: {
    type: String,
    default: null
  },
  "coworking-spaces-telescore": {
    type: Number,
    default: null
  },
  "crime-rate-telescore": {
    type: Number,
    default: null
  },
  "culture-art-galleries-telescore": {
    type: Number,
    default: null
  },
  "culture-art-galleries-venue-count": {
    type: Number,
    default: null
  },
  "culture-cinema-telescore": {
    type: Number,
    default: null
  },
  "culture-cinemas-venue-count": {
    type: Number,
    default: null
  },
  "culture-comedy-clubs-telescore": {
    type: Number,
    default: null
  },
  "culture-comedy-clubs-venue-count": {
    type: Number,
    default: null
  },
  "culture-concerts-telescore": {
    type: Number,
    default: null
  },
  "culture-concerts-venue-count": {
    type: Number,
    default: null
  },
  "culture-historical-sites-telescore": {
    type: Number,
    default: null
  },
  "culture-historical-sites-venue-count": {
    type: Number,
    default: null
  },
  "culture-museums-telescore": {
    type: Number,
    default: null
  },
  "culture-museums-venue-count": {
    type: Number,
    default: null
  },
  "culture-performing-arts-telescore": {
    type: Number,
    default: null
  },
  "culture-performing-arts-venue-count": {
    type: Number,
    default: null
  },
  "culture-sports-telescore": {
    type: Number,
    default: null
  },
  "culture-sports-venue-count": {
    type: Number,
    default: null
  },
  "culture-zoos-telescore": {
    type: Number,
    default: null
  },
  "culture-zoos-venue-count": {
    type: Number,
    default: null
  },
  "currency-urban-area": {
    type: String,
    default: null
  },
  "currency-urban-area-exchange-rate": {
    type: Number,
    default: null
  },
  "drinking-water-quality-telescore": {
    type: Number,
    default: null
  },
  "elderly-people": {
    type: Number,
    default: null
  },
  elevation: {
    type: Number,
    default: null
  },
  "elevation-peaks": {
    type: Number,
    default: null
  },
  "elevation-peaks-telescore": {
    type: Number,
    default: null
  },
  "employer-social-taxes-cap-soc-sec": {
    type: Number,
    default: null
  },
  "employer-social-taxes-other": {
    type: Number,
    default: null
  },
  "employer-social-taxes-soc-sec": {
    type: Number,
    default: null
  },
  "english-skills-detail": {
    type: Number,
    default: null
  },
  "english-skills-telescore": {
    type: Number,
    default: null
  },
  "events-count": {
    type: Number,
    default: null
  },
  "events-last-12-months": {
    type: Number,
    default: null
  },
  "events-telescore": {
    type: Number,
    default: null
  },
  full_name: {
    type: String,
    unique: true
  },
  "funderbeam-total-startups": {
    type: Number,
    default: null
  },
  "funderbeam-venture-capital-telescore": {
    type: Number,
    default: null
  },
  "funding-accelerator-names": {
    type: String,
    default: null
  },
  "funding-accelerators-detail": {
    type: Number,
    default: null
  },
  "gdp-growth-rate": {
    type: Number,
    default: null
  },
  "gdp-growth-rate-telescore": {
    type: Number,
    default: null
  },
  "gdp-per-capita": {
    type: Number,
    default: null
  },
  "gdp-per-capita-telescore": {
    type: Number,
    default: null
  },
  geoname_id: {
    type: Number,
    default: null
  },
  "gun-death-rate": {
    type: Number,
    default: null
  },
  "gun-death-score-telescore": {
    type: Number,
    default: null
  },
  "gun-ownership": {
    type: Number,
    default: null
  },
  "gun-ownership-score-telescore": {
    type: Number,
    default: null
  },
  "gun-score-telescore": {
    type: Number,
    default: null
  },
  "healthcare-cost-telescore": {
    type: Number,
    default: null
  },
  "healthcare-life-expectancy": {
    type: Number,
    default: null
  },
  "healthcare-life-expectancy-telescore": {
    type: Number,
    default: null
  },
  "healthcare-quality-telescore": {
    type: Number,
    default: null
  },
  "human-cities-page-urls": {
    type: String,
    default: null
  },
  "income-tax-telescore": {
    type: Number,
    default: null
  },
  "labor-restrictions": {
    type: Number,
    default: null
  },
  "labor-restrictions-telescore": {
    type: Number,
    default: null
  },
  "lgbt-detail-adoption": {
    type: String,
    default: null
  },
  "lgbt-detail-age-of-consent": {
    type: String,
    default: null
  },
  "lgbt-detail-changing-gender": {
    type: String,
    default: null
  },
  "lgbt-detail-conversion-therapy": {
    type: String,
    default: null
  },
  "lgbt-detail-discrimination": {
    type: String,
    default: null
  },
  "lgbt-detail-donating-blood": {
    type: String,
    default: null
  },
  "lgbt-detail-employment-discrimination": {
    type: String,
    default: null
  },
  "lgbt-detail-homosexuality": {
    type: String,
    default: null
  },
  "lgbt-detail-housing-discrimination": {
    type: String,
    default: null
  },
  "lgbt-detail-marriage": {
    type: String,
    default: null
  },
  "lgbt-index": {
    type: Number,
    default: null
  },
  "lgbt-index-telescore": {
    type: Number,
    default: null
  },
  "life-expectancy": {
    type: Number,
    default: null
  },
  location: {
    type: Object,
    default: { type: "Point", coordinates: [0, 0] }
  },
  "median-age": {
    type: Number,
    default: null
  },
  "meetups-detail-total-events": {
    type: Number,
    default: null
  },
  "meetups-groups": {
    type: Number,
    default: null
  },
  "meetups-members": {
    type: Number,
    default: null
  },
  "meetups-telescore": {
    type: Number,
    default: null
  },
  name: {
    type: String,
    unique: true
  },
  "network-download": {
    type: Number,
    default: null
  },
  "network-download-telescore": {
    type: Number,
    default: null
  },
  "network-upload": {
    type: Number,
    default: null
  },
  "network-upload-telescore": {
    type: Number,
    default: null
  },
  photo: {
    type: String,
    default: null
  },
  "pisa-detail-happiness": {
    type: Number,
    default: null
  },
  "pisa-detail-math-high-performers": {
    type: Number,
    default: null
  },
  "pisa-detail-math-low-performers": {
    type: Number,
    default: null
  },
  "pisa-detail-math-mean-scores": {
    type: Number,
    default: null
  },
  "pisa-detail-reading-high-performers": {
    type: Number,
    default: null
  },
  "pisa-detail-reading-low-performers": {
    type: Number,
    default: null
  },
  "pisa-detail-reading-mean-scores": {
    type: Number,
    default: null
  },
  "pisa-detail-science-high-performers": {
    type: Number,
    default: null
  },
  "pisa-detail-science-low-performers": {
    type: Number,
    default: null
  },
  "pisa-detail-science-mean-scores": {
    type: Number,
    default: null
  },
  "pisa-maths-ranking": {
    type: Number,
    default: null
  },
  "pisa-ranking": {
    type: Number,
    default: null
  },
  "pisa-ranking-telescore": {
    type: Number,
    default: null
  },
  "pisa-reading-ranking": {
    type: Number,
    default: null
  },
  "pisa-science-ranking": {
    type: Number,
    default: null
  },
  population: {
    type: Number,
    default: null
  },
  "population-size": {
    type: Number,
    default: null
  },
  "population-ua-center-density": {
    type: Number,
    default: null
  },
  "population-ua-density": {
    type: Number,
    default: null
  },
  "quality-of-universities-telescore": {
    type: Number,
    default: null
  },
  "rent-index-telescore": {
    type: Number,
    default: null
  },
  "restaurant-price-index": {
    type: Number,
    default: null
  },
  score_business_freedom: {
    type: Number,
    default: null
  },
  score_commute: {
    type: Number,
    default: null
  },
  score_cost_of_living: {
    type: Number,
    default: null
  },
  score_economy: {
    type: Number,
    default: null
  },
  score_education: {
    type: Number,
    default: null
  },
  score_environmental_quality: {
    type: Number,
    default: null
  },
  score_healthcare: {
    type: Number,
    default: null
  },
  score_housing: {
    type: Number,
    default: null
  },
  score_internet_access: {
    type: Number,
    default: null
  },
  "score_leisure_&_culture": {
    type: Number,
    default: null
  },
  score_outdoors: {
    type: Number,
    default: null
  },
  score_safety: {
    type: Number,
    default: null
  },
  score_startups: {
    type: Number,
    default: null
  },
  score_taxation: {
    type: Number,
    default: null
  },
  score_tolerance: {
    type: Number,
    default: null
  },
  score_total: {
    type: Number,
    default: null
  },
  score_travel_connectivity: {
    type: Number,
    default: null
  },
  score_venture_capital: {
    type: Number,
    default: null
  },
  "seaside-access-telescore": {
    type: Number,
    default: null
  },
  short_name: {
    type: String,
    default: null
  },
  "spoken-languages": {
    type: String,
    default: null
  },
  "startup-climate-investors": {
    type: Number,
    default: null
  },
  "startup-climate-new-startups": {
    type: Number,
    default: null
  },
  "startup-climate-new-startups-telescore": {
    type: Number,
    default: null
  },
  "startup-climate-scene-telescore": {
    type: Number,
    default: null
  },
  "startup-climate-startups-telescore": {
    type: Number,
    default: null
  },
  "startup-jobs-available": {
    type: Number,
    default: null
  },
  "startup-jobs-available-telescore": {
    type: Number,
    default: null
  },
  "startup-salaries": {
    type: Number,
    default: null
  },
  "startup-salaries-detail": {
    type: Number,
    default: null
  },
  state: {
    type: String,
    default: null
  },
  "tax-vat": {
    type: Number,
    default: null
  },
  "time-overhead-company-taxes": {
    type: Number,
    default: null
  },
  "time-to-open-business": {
    type: Number,
    default: null
  },
  "time-to-open-business-telescore": {
    type: Number,
    default: null
  },
  time_zone: {
    type: String,
    default: null
  },
  "tolerance-towards-minorities-telescore": {
    type: Number,
    default: null
  },
  "traffic-index-telescore": {
    type: Number,
    default: null
  },
  "train-transport-telescore": {
    type: Number,
    default: null
  },
  "unemployment-rate": {
    type: Number,
    default: null
  },
  "universities-best-ranked-name": {
    type: String,
    default: null
  },
  "universities-best-ranked-rank": {
    type: Number,
    default: null
  },
  "urban-greenery-telescore": {
    type: Number,
    default: null
  },
  "weather-av-day-length": {
    type: Number,
    default: null
  },
  "weather-av-number-clear-days": {
    type: Number,
    default: null
  },
  "weather-av-number-rainy-days": {
    type: Number,
    default: null
  },
  "weather-av-percent-chance-clear-skies": {
    type: Number,
    default: null
  },
  "weather-av-possibility-sunshine": {
    type: Number,
    default: null
  },
  "weather-average-high": {
    type: String,
    default: null
  },
  "weather-average-low": {
    type: String,
    default: null
  },
  "weather-sunshine-amount": {
    type: String,
    default: null
  },
  "weather-type": {
    type: String,
    default: null
  },
  "workfrom-coworking-spaces-count": {
    type: Number,
    default: null
  }
});
//citySchema.index({ location: "2dsphere" });
module.exports = mongoose.model("City", citySchema);;
