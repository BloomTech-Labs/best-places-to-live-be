#### Package manager:
 -  NPM

# ⚙️ API Documentation

#### Backend deployed at:

#### Contest and Deployment
#### [https://bestplacesbe-contest.herokuapp.com/] 
#### [https://bestplacesbe-test.herokuapp.com/]

#### Master 
####  [https://bestplacesbe.herokuapp.com/]

  💻 Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- Install MongoDB in your local machine: []https://docs.mongodb.com/manual/administration/install-community/](https://docs.mongodb.com/manual/administration/install-community/)
- Run MongoDB locally by entering `mongo` in your terminal.
- Inside the mongo instance enter:

```
use admin
```

and in the same mongo instance create a `letsmovehomie` user and `Fastwerds` password:

```js
db.createUser({
  user: "letsmovehomie",
  pwd: "Fastwerds",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
});
```

- Now that your local MongoDB is setup enter **npm start** in your terminal to start the local server.
- **npm test** to start server using testing environment

# Seeding:

## Seeding all 392 Cities:

- To seed your local MongoDB with our 392 cities, install [mongo-seeding-cli](https://www.npmjs.com/package/mongo-seeding-cli)

- The file for seeding is inside `/data-seeding/1-cities/index.js`
  for more information about the file structure: [Seeding MongoDB database the right way](https://medium.com/@pkosiec/seeding-mongodb-database-the-right-way-32a8a0e75490)

- Then execute `seed --db-name production ./data-seeding` in your terminal
  this command will seed all 392 cities in your local MongoDB

## Seeding avg_commute_time_score

- run `node ./calculation-seeding/calcScores.js` to calculate the letter grade (A, B, C, D, E) for each city in our database.

## Inside our Digital Ocean Droplet:

- Remember to restart the node server by executing `pm2 restart index` in the terminal

 #### MongoDB Database Backup:
  - To create a backup of the current MongoDB database: mongodump -d production -o ~/mongoBackups/date-of-backup

  - To restore a backup: mongorestore ~/mongoBackups/date-of-backup/


## 🗂 BACKEND DATABASE:

- MongoDB


##  📚  BACKEND FRAMEWORK:
We used:
 - NodeJS
 - Express
 - Passport.js
 - Cors(Middleware)


 ##  📚  TESTING LIBRARYS:
  - Jest
  - Chai
  - SuperTest 
  - dmibpj3wx

 ##  📚 API
 - DuckDuckGo
  ### [https://api.duckduckgo.com/api]
  - This API is used to get the summary of the cities.




# 🔌 ENDPOINTS

## 🌎 URL: `https://bestplacesbe.herokuapp.com/`


#### 🏢 Users Web Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST   | `/register`             |   users           | Registers a new user.                   |
| POST   | `/login`                |   users           | Sign in a user .                        |
| GET    | `/auth/google`        |   users           | Sign in using google.                     |
| GET    | `/auth/facebook`        |   users           | Sign in using facebook.                 |


### 🏢 Users IOS Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST   | `/signup`             |   users           | Registers a new user.                   |
| POST   | `/signin`             |   users           | Sign in a user .                        |




#### 👥  User Profile Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/profile`              |   users           | See the users profile.                   |
| PUT    | `/profile`              |   users           | Able to edits the saved  list.           |
| POST   | `/profile/cities`       |   users           | Able to delete the saved list.           |
| DELETE | `/profile/cities`       |   users           | Deletes cities from your saved list.     |
   

### 🏢 Users Likes/dislikes router
| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST   | `/likes`             |   users           | Save user likes.                        |
| Delete | `/likes`             |   users           | Delete user likes .                     |
| POST   | `/dislikes`          |   users           | Save user dislikes.                     |
| Delete | `/dislikes`         |   users            | Delete user dislikes .                  |
| GET    | `/info`             |   users            | Delete user dislikes .                  |


### 🏢 Users factors router 
| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST   | `/factors`             |   users           | Save user Factors.                       |
| Delete | `/factors`             |   users           | Delete user Factors.                     |
| Put    | `/factors`             |   users           | Update user Factors.                     |



#### 🏢 City Router

| Method | Endpoint           | Access Control | Description                                                       |
| ------ | ------------------ | -------------- | ----------------------------------------------------------------- |
| GET    | `/city/all/`       | public         | Returns ***only*** the `_id` and `name` fields of all 5037 cities.|
| GET    | `/city/topten-score_total`| public  | Returns top ten cities with all of their data. |


#### 🏢  [DS internal] City Router

| Method | Endpoint           | Access Control | Description                                                       |
| ------ | ------------------ | -------------- | ----------------------------------------------------------------- |
| POST   | `/city/ds  `       | public         |Endpoint fetching data from DS side.                               |
| POST   | `/city/spec-ds`    | public         | User's [dislikes] to filter results.                              |           
| POST   | `/city/visiual`    | public         |  Endpoint fetching data from DS side.                             |
| GET    | `/city/jobs`       | public         |  Endpoint fetching data from indreed API.                             |  


#### 🏢 City Search

| Method | Endpoint       | Access Control | Description |
| ------ | -------------- | -------------- | --------------------------------------------------------------|
| POST   | `/city/`       | public         | <details> <summary>Returns cities requested in body</summary>_body_ {<br/>&nbsp;&nbsp;&nbsp;&nbsp;**ids: []** // list of ids that you want data back on<br/>&nbsp;&nbsp;&nbsp;&nbsp;**model: {}** //object with same keyvalues of the data you want in the list of &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;objects<br/>}</details>|
| POST   | `/city/search` | public         | <details><summary>Returns cities that contain search term</summary>_body_ <br> { <br>&nbsp;&nbsp;"searchTerm": "miami" <br>}</details>|
| POST   | `/city/top`    | public         | <details> <summary>Returns The Top cities based on Category</summary>_query_<br/>{<br/>&nbsp;&nbsp;&nbsp;&nbsp;**q: "",** //forced name filter use this to only grab a particluar state.Defaults to null<br/>&nbsp;&nbsp;&nbsp;&nbsp;**filter: "",** //name of the key value of the data model you wanna sort by. Defaults to Score*total<br/>&nbsp;&nbsp;&nbsp;&nbsp;**limit: Number,** //Number of items you want back. Defaults 10<br/>&nbsp;&nbsp;&nbsp;&nbsp;**order:""** //asc for bottom or none for top. Defaults to top<br/>}<br/>\_body*<br/>{<br/>&nbsp;&nbsp;&nbsp;&nbsp;**model: {}** //object with same keyvalues of the data you want in the list of &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;objects<br/>}</details> |
| POST   | `/city/location` | public         | <details><summary>Return an array of cities sorted by distanec of the passed in location.</summary>_query_<br/>{<br/>&nbsp;&nbsp;&nbsp;&nbsp;**lat: Number,** //latitude of the location<br/>&nbsp;&nbsp;&nbsp;&nbsp;**lng: Number,** //longitude of the location<br/>&nbsp;&nbsp;&nbsp;&nbsp;**zoom: Number,** //google zoom helps determine how far to look<br/>&nbsp;&nbsp;&nbsp;&nbsp;**rand: Number** //Get a random set back, automatically does this if zooom < 7<br/>&nbsp;&nbsp;&nbsp;&nbsp;**limit: Number** // sets the number of elements<br/>}<br/>_body_ <br/> { <br>&nbsp;&nbsp;**"model": Object** // sets the elements you want back from the db <br>}</details>|




BASE URL
/profile

---

| Method | Endpoint  | Access Control | Description                |
| ------ | --------- | -------------- | -------------------------- |
| GET    | `/`       | private        | Retrieve user data object  |
| GET    | `/cities` | private        | Retrieve user saved cities |
| POST   | `/cities` | private        | add user saved cities      |
| DELETE | `/cities` | private        | delete user saved cities   |

## 📜 Data Models

<details>
<summary>
  🏢 Cities Model:
 </summary>

```
{
   grade_business_freedom: String,
  grade_commute: String,
  grade_cost_of_living: String,
  grade_economy: String,
  grade_education: String,
  grade_environmental_quality: String,
  grade_healthcare: String,
  grade_housing: String,
  grade_internet_access: String,
  "grade_leisure_&_culture": String,
  grade_outdoors: String,
  grade_safety: String,
  grade_startups: String,
  grade_taxation: String,
  grade_tolerance: String,
  grade_total: String,
  grade_travel_connectivity: String,
  grade_venture_capital: String,

  "air-pollution-telescore": Number,
  "airport-hub-index-detail": Number,
  "airport-hub-telescore": Number,
  "apartment-rent-large": Number,
  "apartment-rent-medium": Number,
  "apartment-rent-small": Number,
  avg_commute_time: Number,
  avg_commute_time_score: String,
  "business-freedom": Number,
  "business-freedom-telescore": Number,
  "cleanliness-telescore": Number,
  "company-profit-tax-rate": Number,
  "company-profit-tax-rate-telescore": Number,
  "consumer-price-index-telescore": Number,
  "corruption-freedom": Number,
  "corruption-freedom-telescore": Number,
  "cost-apples": Number,
  "cost-bread": Number,
  "cost-cappuccino": Number,
  "cost-cinema": Number,
  "cost-fitness-club": Number,
  "cost-import-beer": Number,
  "cost-public-transport": Number,
  "cost-restaurant-meal": Number,
  "cost-taxi": Number,
  cost_of_living: String,
  country: String,
  "coworking-spaces-telescore": Number,
  "crime-rate-telescore": Number,
  "culture-art-galleries-telescore": Number,
  "culture-art-galleries-venue-count": Number,
  "culture-cinema-telescore": Number,
  "culture-cinemas-venue-count": Number,
  "culture-comedy-clubs-telescore": Number,
  "culture-comedy-clubs-venue-count": Number,
  "culture-concerts-telescore": Number,
  "culture-concerts-venue-count": Number,
  "culture-historical-sites-telescore": Number,
  "culture-historical-sites-venue-count": Number,
  "culture-museums-telescore": Number,
  "culture-museums-venue-count": Number,
  "culture-performing-arts-telescore": Number,
  "culture-performing-arts-venue-count": Number,
  "culture-sports-telescore": Number,
  "culture-sports-venue-count": Number,
  "culture-zoos-telescore": Number,
  "culture-zoos-venue-count": Number,
  "currency-urban-area": String,
  "currency-urban-area-exchange-rate": Number,
  "drinking-water-quality-telescore": Number,
  "elderly-people": Number,
  elevation: Number,
  "elevation-peaks": Number,
  "elevation-peaks-telescore": Number,
  "employer-social-taxes-cap-soc-sec": Number,
  "employer-social-taxes-other": Number,
  "employer-social-taxes-soc-sec": Number,
  "english-skills-detail": Number,
  "english-skills-telescore": Number,
  "events-count": Number,
  "events-last-12-months": Number,
  "events-telescore": Number,
  full_name: String,
  "funderbeam-total-startups": Number,
  "funderbeam-venture-capital-telescore": Number,
  "funding-accelerator-names": String,
  "funding-accelerators-detail": Number,
  "gdp-growth-rate": Number,
  "gdp-growth-rate-telescore": Number,
  "gdp-per-capita": Number,
  "gdp-per-capita-telescore": Number,
  geoname_id: Number,
  "gun-death-rate": Number,
  "gun-death-score-telescore": Number,
  "gun-ownership": Number,
  "gun-ownership-score-telescore": Number,
  "gun-score-telescore": Number,
  "healthcare-cost-telescore": Number,
  "healthcare-life-expectancy": Number,
  "healthcare-life-expectancy-telescore": Number,
  "healthcare-quality-telescore": Number,
  "human-cities-page-urls": String,
  "income-tax-telescore": Number,
  "labor-restrictions": Number,
  "labor-restrictions-telescore": Number,
  "lgbt-detail-adoption": String,
  "lgbt-detail-age-of-consent": String,
  "lgbt-detail-changing-gender": String,
  "lgbt-detail-conversion-therapy": String,
  "lgbt-detail-discrimination": String,
  "lgbt-detail-donating-blood": String,
  "lgbt-detail-employment-discrimination": String,
  "lgbt-detail-homosexuality": String,
  "lgbt-detail-housing-discrimination": String,
  "lgbt-detail-marriage": String,
  "lgbt-index": Number,
  "lgbt-index-telescore": Number,
  "life-expectancy": Number,
  location:
  {
    "geohash": String
    "latlon"
    {
       "latitude": Number,
       "longitude": Number
    }
  },
  "median-age": Number,
  "meetups-detail-total-events": Number,
  "meetups-groups": Number,
  "meetups-members": Number,
  "meetups-telescore": Number,
  name: String,
    default: null,
    unique: true
  },
  "network-download": Number,
  "network-download-telescore": Number,
  "network-upload": Number,
  "network-upload-telescore": Number,
  photo: String,
  "pisa-detail-happiness": Number,
  "pisa-detail-math-high-performers": Number,
  "pisa-detail-math-low-performers": Number,
  "pisa-detail-math-mean-scores": Number,
  "pisa-detail-reading-high-performers": Number,
  "pisa-detail-reading-low-performers": Number,
  "pisa-detail-reading-mean-scores": Number,
  "pisa-detail-science-high-performers": Number,
  "pisa-detail-science-low-performers": Number,
  "pisa-detail-science-mean-scores": Number,
  "pisa-maths-ranking": Number,
  "pisa-ranking": Number,
  "pisa-ranking-telescore": Number,
  "pisa-reading-ranking": Number,
  "pisa-science-ranking": Number,
  population: Number,
  "population-size": Number,
  "population-ua-center-density": Number,
  "population-ua-density": Number,
  "quality-of-universities-telescore": Number,
  "rent-index-telescore": Number,
  "restaurant-price-index": Number,
  score_business_freedom: Number,
  score_commute: Number,
  score_cost_of_living: Number,
  score_economy: Number,
  score_education: Number,
  score_environmental_quality: Number,
  score_healthcare: Number,
  score_housing: Number,
  score_internet_access: Number,
  "score_leisure_&_culture": Number,
  score_outdoors: Number,
  score_safety: Number,
  score_startups: Number,
  score_taxation: Number,
  score_tolerance: Number,
  score_total: Number,
  score_travel_connectivity: Number,
  score_venture_capital: Number,
  "seaside-access-telescore": Number,
  short_name: String,
  "spoken-languages": String,
  "startup-climate-investors": Number,
  "startup-climate-new-startups": Number,
  "startup-climate-new-startups-telescore": Number,
  "startup-climate-scene-telescore": Number,
  "startup-climate-startups-telescore": Number,
  "startup-jobs-available": Number,
  "startup-jobs-available-telescore": Number,
  "startup-salaries": Number,
  "startup-salaries-detail": Number,
  state: String,
  "tax-vat": Number,
  "time-overhead-company-taxes": Number,
  "time-to-open-business": Number,
  "time-to-open-business-telescore": Number,
  time_zone: String,
  "tolerance-towards-minorities-telescore": Number,
  "traffic-index-telescore": Number,
  "train-transport-telescore": Number,
  "unemployment-rate": Number,
  "universities-best-ranked-name": String,
  "universities-best-ranked-rank": Number,
  "urban-greenery-telescore": Number,
  "weather-av-day-length": Number,
  "weather-av-number-clear-days": Number,
  "weather-av-number-rainy-days": Number,
  "weather-av-percent-chance-clear-skies": Number,
  "weather-av-possibility-sunshine": Number,
  "weather-average-high": String,
  "weather-average-low": String,
  "weather-sunshine-amount": String,
  "weather-type": String,
  "workfrom-coworking-spaces-count": Number
}
```

</details>
<details>
<summary>👥 User Model:</summary>

```
{
  _id: String,
  name: String,
  email: String, UNIQUE
  password: String,
  location:string
}
```
RETURN

{
  "_id": "5dcc64cafe92aa0017751599",
  "name": "Fredo",
  "email": "fredo12@gmail.com",
  "location": "Atlanta,GA",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGNjNjRjYWZlOTJhYTAwMTc3NTE1OTkiLCJuYW1lIjoiQXJ5YSIsImVtYWlsIjoic3Rpbmt5QGJhYnkuY29tIiwibG9jYXRpb24iOiJIaWdobGFuZCwgQ0EiLCJpYXQiOjE1NzM2NzYyMzQsImV4cCI6MTU3Mzc2MjYzNH0.bSuZwNb-azgeiDl5jT7nDGDLhIDOApkjLJ8kzyE0mMA"
}

</details>

<details>
  <summary>iOS Endpoints - User's favorite cities</summary>

  ## POST `https://bestplacesbe-test.herokuapp.com/users/profile/cities`

  REQUIRES:

    HEADERS:
  ```
  {
    headers: {
      Authorization: "token"
    }
  }
  ```

    JSON BODY
  ```
  {
    "city_id": "535358409283535",
    "city_name": "Seattle, WA",
    "city_photo": "https://letsmovehomie-city-photoes.nyc3.digitaloceanspaces.com/tallahase-fl.jpg"
  }
  ```

  RETURNS

  ```
  {
    "_id": "5d7acebe82c76cf25955b4e5",
    "name": "Carlos",
    "email": "carlos@carlos.com",
    "cities": [
      "city_id": "535358409283535",
      "city_name": "Seattle, WA",
      "city_photo": "https://letsmovehomie-city-photoes.nyc3.digitaloceanspaces.com/tallahase-fl.jpg"
    ]
  }
  ```

  ## DELETE `https://bestplacesbe-test.herokuapp.com/users/profile/cities`

  REQUIRES:

    HEADERS:
  ```
  {
    headers: {
      Authorization: "token"
    }
  }
  ```

    JSON BODY
  ```
  {
    "city_id": "535358409283535"
  }
  ```

  RETURNS

  ```
  {
    "_id": "5d7acebe82c76cf25955b4e5",
    "name": "Carlos",
    "email": "carlos@carlos.com",
    "cities": []
  }
  ```
</details>

<details>
  <summary>iOS Endpoints - Update user's information - password, name, email, etc</summary>

  ## PUT `https://bestplacesbe-test.herokuapp.com/users/profile/`

  REQUIRES:

    HEADERS:
  ```
  {
    headers: {
      Authorization: "token"
    }
  }
  ```

    JSON BODY WITH FIELDS TO UPDATE (Not all fields are required)
  ```
  {
    "name": "Changed Name",
    "email": "changed@email.com",
    "password": "changedPassword"
  }
  ```
    NOTE: If password field is sent, there is a function that will hash the new password before storing to database.

  RETURNS

  ```
  {
    "_id": "5d7acebe82c76cf25955b4e5",
    "name": "Changed Name",
    "email": "changed@email.com",
    "cities": [
      ...
    ]
  }
  ```
</details>

## ⚠️ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

Please create a .env file that includes the following:

    MONGO_USERNAME= MongoDB username
    MONGO_PASSWORD= MongoDB username's password
    MONGO_HOSTNAME= URI of where MongoDB is hosted
    MONGO_PORT= MongoDB port
    MONGO_DB= MongoDB name

    GOOGLE_CLIENTID= Google Authentication API Client ID
    GOOGLE_CLIENTSECRET= Google Authentication API Client Secret

    FACEBOOK_CLIENTID= Facebook Authentication API Client ID
    FACEBOOK_CLIENTSECRET= Facebook Authentication API Client Secret

    COOKIE_KEY= Cookie Key for Passportjs

## 📡 Actions - TODO

🚫 This is an example, replace this with the actions that pertain to your backend

`getOrgs()` -> Returns all organizations

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user

## 🤝 Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### 🕷 Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### ☄️ Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### 🛠 Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### 📜 Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.


#### 👏 Attribution

- These contribution guidelines have been adapted from this good-Contributing.md-template.


## Documentation

### 🖥 [Frontend Documentation](https://github.com/Lambda-School-Labs/best-places-to-live-fe) for details on the frontend application of our project.

### 📱 [iOS Documentation](https://github.com/Lambda-School-Labs/ios) for details on the mobile iOS application of our project.

