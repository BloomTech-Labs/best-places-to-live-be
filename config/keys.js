module.exports = {
  mongoURI: `mongodb+srv://${process.env.TESTING_MONGO_USERNAME}:${process.env.TESTING_MONGO_PASSWORD}@${process.env.TESTING_MONGO_HOSTNAME}?retryWrites=true&w=majority`
}
