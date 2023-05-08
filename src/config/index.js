module.exports = {
  database: {
    mongoURI: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES_DAY,
  },
};
