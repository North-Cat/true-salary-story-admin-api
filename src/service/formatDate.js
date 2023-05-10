const formatDate = (date) => {
  return new Date(date).toISOString().substring(0, 10);
};

module.exports = formatDate;
