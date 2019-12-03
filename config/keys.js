

module.exports = {
  mongodb: {
    dbURI: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
  },
  session: {
    cookieKey: process.env.COOKIE_KEY
  },
  googleAuth: {
    // googleClientId: process.env.GOOGLE_CLIENTID,
    // googleClientSecret: process.env.GOOGLE_CLIENTSECRET,
    googleClinetId:'257506570786-9v5lgvl06hscddcublc4d06vkph9i0q8.apps.googleusercontent.com',
    googleClientSecret:'QRDix_PJ1-ctZxCyFJozNz_H',
    callbackURL: '/auth/google/callback' 
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