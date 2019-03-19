import axios from "axios";
import { baseURL } from "config";

const ip = require("ip");

const fetchChartData = async () => {
  try {
    const { data } = await axios({
      method: "get",
      url: "/api/fetchChartData",
      baseURL,
      headers: {
        "Content-Type": "application/json"
      }
    });

    return data;
  } catch (e) {
    console.log("Data fetch error ::: ", e);
  }
};

export default fetchChartData;
