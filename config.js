// @flow
const environment = process.env.NODE_ENV;
const ip = require("ip");

const baseURL =
  environment === "development" ? undefined : "http://localhost:3000";

module.exports = { baseURL };
