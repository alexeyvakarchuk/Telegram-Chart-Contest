// @flow
const environment = process.env.NODE_ENV;

const baseURL =
  environment === "development"
    ? "http://localhost:3000"
    : "http://localhost:3000";

module.exports = { baseURL };
