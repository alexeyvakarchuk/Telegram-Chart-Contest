import fetchChartData from "scripts/fetchChartData";
import renderChart from "./renderChart";
import "./rangeGraph";
import { getStyleObject } from "./utils";

const init = async () => {
  const data = await fetchChartData();

  const firstChardData = data[0];

  const maxYArray = firstChardData.columns
    .slice(1)
    .map(el => Math.max(...el.slice(1)));

  const maxY = Math.max(...maxYArray) + 5;

  const minChartSvg = document.querySelector(".minChartSvg");

  const proportion = maxY / minChartSvg.clientHeight;

  minChartSvg.setAttribute(
    "viewBox",
    `0 0 ${minChartSvg.clientWidth * proportion} ${maxY}`
  );

  const interval =
    minChartSvg.clientWidth / (firstChardData.columns[0].length - 2);

  const chartPaths = firstChardData.columns.slice(1).map(pathData => {
    let d = `M 0 ${maxY - pathData[1]}`;

    pathData.slice(2).forEach((value, index) => {
      d += ` L ${++index * interval * proportion} ${maxY + 5 - value}`;
    });

    return { pathName: pathData[0], d };
  });

  chartPaths.forEach(({ pathName, d }) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    path.setAttribute("d", d);
    path.setAttribute("fill", "transparent");
    path.setAttribute("stroke", firstChardData.colors[pathName]);
    path.setAttribute("stroke-width", "10");

    minChartSvg.appendChild(path);
  });

  // Observes changes for the bottom small chart box
  const box = document.querySelector(".box");

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      const oldStyle = getStyleObject(mutation.oldValue);

      const newStyle = {
        width: parseInt(box.style.width),
        left: parseInt(box.style.left)
      };

      console.log(oldStyle, newStyle);
    });
  });

  const config = {
    attributeFilter: ["style"],
    attributes: true,
    attributeOldValue: true
  };

  observer.observe(box, config);

  // Initial Chart render
  renderChart(firstChardData, 150, minChartSvg.clientWidth - 150);
};
export default init;
