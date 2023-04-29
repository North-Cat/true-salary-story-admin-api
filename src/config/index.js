module.exports = {
  database: {
    mongoURI: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expires: process.env.EXPIRES_DAY,
  },
};
