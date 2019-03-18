// @flow
const environment = process.env.NODE_ENV;

const baseURL =
  environment === "development" ? undefined : "http://localhost:3000";

module.exports = { baseURL };
