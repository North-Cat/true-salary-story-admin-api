module.exports = {
  database: {
    dev: process.env.LOCAL_MONGODB_URI,
    prod: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES_DAY,
  },
};
