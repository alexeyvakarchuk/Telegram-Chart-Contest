import { arrayExpression } from "babel-types";

const renderChart = (chartData, boxWidth, leftOffset) => {
  const chartContainer = document.querySelector(".chart");
  const chartSvg = document.querySelector(".graph");
  const shartG = chartSvg.querySelector(".charts");

  const leftArrOffset =
    (leftOffset / chartContainer.clientWidth) *
    (chartData.columns[0].length - 1);

  const rigthArrOffset =
    ((leftOffset + boxWidth) / chartContainer.clientWidth) *
    (chartData.columns[0].length - 1);

  //   console.log(Math.ceil(leftArrOffset), Math.floor(rigthArrOffset));

  const maxYArray = chartData.columns
    .slice(1)
    .map(el =>
      Math.max(
        ...el.slice(
          1 + Math.floor(leftArrOffset),
          1 + Math.ceil(rigthArrOffset)
        )
      )
    );

  const maxY = Math.max(...maxYArray) + 5;

  // Koefficient
  const k = chartContainer.clientWidth / boxWidth;

  const proportion = maxY / chartSvg.clientHeight;

  chartSvg.setAttribute(
    "viewBox",
    `0 0 ${chartContainer.clientWidth * k * proportion} ${maxY}`
  );

  chartSvg.style.width = chartContainer.clientWidth * k;

  chartSvg.style.transform = `translateX(-${leftOffset * k}px)`;

  const interval =
    (chartContainer.clientWidth * k) / (chartData.columns[0].length - 2);

  const chartPaths = chartData.columns.slice(1).map(pathData => {
    let d = `M 0 ${maxY - pathData[1]}`;

    pathData.slice(2).forEach((value, index) => {
      d += ` L ${++index * interval * proportion} ${maxY + 5 - value}`;
    });

    return { pathName: pathData[0], d };
  });

  // Remove other(previous) chart paths
  while (shartG.firstChild) {
    shartG.removeChild(shartG.firstChild);
  }

  chartPaths.forEach(({ pathName, d }) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    path.setAttribute("d", d);
    path.setAttribute("fill", "transparent");
    path.setAttribute("stroke", chartData.colors[pathName]);
    path.setAttribute("stroke-width", 2 * (maxY / chartSvg.clientHeight));
    path.setAttribute("stroke-linejoin", "round");

    shartG.appendChild(path);
  });
};

export default renderChart;
