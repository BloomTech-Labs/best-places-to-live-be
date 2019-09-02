module.exports = {
  mongodb: {
    dbURI: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`
  },
  session: {
    cookieKey: process.env.COOKIE_KEY
  },
  googleAuth: {
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET
  }
};
