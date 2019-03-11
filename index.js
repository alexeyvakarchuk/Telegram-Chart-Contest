import "@babel/polyfill";
import "./styles/main.sass";

import fetchChartData from "scripts/fetchChartData";

(async () => {
  await fetchChartData();
})();

if (module.hot) {
  module.hot.accept("./scripts/fetchChartData", async () => {
    await fetchChartData();
  });
}
