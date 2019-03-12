import fetchChartData from "scripts/fetchChartData";

const init = async () => {
  const data = await fetchChartData();

  const firstChardData = data[0];

  console.log(firstChardData);
};

export default init;
