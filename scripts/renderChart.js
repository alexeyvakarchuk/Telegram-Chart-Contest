const renderChart = (chartData, boxWidth, leftOffset) => {
  const maxYArray = chartData.columns
    .slice(1)
    .map(el => Math.max(...el.slice(1)));

  const maxY = Math.max(...maxYArray) + 5;

  const chartContainer = document.querySelector(".chart");
  const chartSvg = document.querySelector(".graph");
  const shartG = chartSvg.querySelector(".charts");

  // Koefficient
  const k = chartContainer.clientWidth / boxWidth;

  const proportion = maxY / chartSvg.clientHeight;

  console.log(chartContainer.clientWidth, boxWidth, k, proportion);

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
    path.setAttribute("stroke-width", 1.5);

    shartG.appendChild(path);
  });
};

export default renderChart;
