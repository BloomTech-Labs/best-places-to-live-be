# ⚠️Development Engineer Git Flow:

- Resolve all merge conflicts locally
- Compare your `branch` with `Release-Canvas-2-Development`
- Create PR

# Package manager:
- NPM

# ⚙️ API Documentation

#### Backend deployed at [https://stagebe.letsmovehomie.com/city](https://stagebe.letsmovehomie.com/city)

## 💻 Getting started

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
db.createUser(
  {
    user: "letsmovehomie",
    pwd: "Fastwerds",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
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
 - run `node /calculation-seeding/avg_commute_time_score.js` to calculate the letter grade (A, B, C, D, E) for each city in our database.

# MongoDB Database Backup:
 - To create a backup of the current MongoDB database:
 `mongodump -d production -o ~/mongoBackups/date-of-backup`

 - To restore a backup:
 `mongorestore ~/mongoBackups/date-of-backup/`

## 🗂 Backend Database:
-    MongoDB

## 📚 Backend Libraries
-    Mongoose
-    Express
-    Passport.js

# 🔌 Endpoints

## 🌎 URL: `https://stagebe.letsmovehomie.com/`

#### 🏢 City Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/city` | public    | Returns all 392 cities. |
| GET    | `/city/topten-cost-of-living/` | public    | Returns top ten cities with the highest score of cost of living from all of our database, in descending order. |
| GET    | `/city/topten-average-commute-time/` | public    | Returns top ten cities with the lowest average commute time from all of our database, in ascending order. |

#### 👥 User Routes
| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST   | `/users/register` | public                | Creates a new user in database.|
| POST   | `/users/login` | public                | Logs in user.|

## 📜 Data Models

#### 🏢 Cities Model:
---
```
{
  _id: String,
  name: String, UNIQUE
  cost_of_living: String,
  photo: String,
  avg_commute_time: Number,
  avg_commute_time_score: String,
}
```

#### 👥 User Model:
---
```
{
  _id: String,
  name: String,
  email: String, UNIQUE
  password: String
}
```

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
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

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

### 👏 Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

### 🖥 [Frontend Documentation](https://github.com/labs15-best-places/front-end) for details on the frontend application of our project.

### 📱 [iOS Documentation](https://github.com/labs15-best-places/ios) for details on the mobile iOS application of our project.
