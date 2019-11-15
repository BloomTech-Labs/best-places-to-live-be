module.exports = {
  mongodb: {
    dbURI: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
  },
  session: {
    cookieKey: process.env.COOKIE_KEY
  },
  googleAuth: {
    googleClientId: process.env.GOOGLE_CLIENTID,
    googleClientSecret: process.env.GOOGLE_CLIENTSECRET
  },
  facebookAuth: {
    facebookClientId: '482046309075252',
    facebookClientSecret: 'bb6a4796a1ca2d541a2b0d6520ef7d9e',
    callbackURL: '/auth/facebook/callback'
  },
  jwtAuth: {
    secret: process.env.JWT_SECRET
  }
};