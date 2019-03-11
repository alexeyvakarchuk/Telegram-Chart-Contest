import axios from "axios";
import { baseURL } from "config";

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

    console.log(data);
  } catch (e) {
    console.log("Data fetch error ::: ", e);
  }
};

export default fetchChartData;
