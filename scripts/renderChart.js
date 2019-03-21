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

  const viewBoxAnimation = chartSvg.querySelector("#viewBoxAnimation");
  // console.log(
  //   viewBoxAnimation.getAttribute("to"),
  //   `0 0 ${chartContainer.clientWidth * k * proportion} ${maxY}`
  // );

  // if (!viewBoxAnimation.getAttribute("to")) {
  //   viewBoxAnimation.setAttribute(
  //     "from",
  //     `0 0 ${chartContainer.clientWidth * k * proportion} ${maxY}`
  //   );
  //   viewBoxAnimation.setAttribute(
  //     "to",
  //     `0 0 ${chartContainer.clientWidth * k * proportion} ${maxY}`
  //   );
  // } else {
  //   console.log(parseInt(viewBoxAnimation.getAttribute("to").slice(-3)));
  //   viewBoxAnimation.setAttribute(
  //     "from",
  //     `0 0 ${chartContainer.clientWidth * k * proportion} ${parseInt(
  //       viewBoxAnimation.getAttribute("to").slice(-3)
  //     )}`
  //   );
  //   viewBoxAnimation.setAttribute(
  //     "to",
  //     `0 0 ${chartContainer.clientWidth * k * proportion} ${maxY}`
  //   );
  //   if (parseInt(viewBoxAnimation.getAttribute("to").slice(-3)) !== maxY) {
  //     viewBoxAnimation.beginElement();
  //   }
  // }

  console.log(chartSvg.getAttribute("viewBox"));

  chartSvg.setAttribute(
    "viewBox",
    `0 0 ${chartContainer.clientWidth * k * proportion} ${maxY}`
  );

  // if (
  //   chartSvg.getAttribute("viewBox") &&
  //   chartSvg.getAttribute("viewBox").length
  // ) {
  //   if (parseInt(chartSvg.getAttribute("viewBox").split(" ")[3]) !== maxY) {
  //     console.log(
  //       "should animate",
  //       parseInt(chartSvg.getAttribute("viewBox").split(" ")[3]),
  //       maxY
  //     );

  //     console.log(
  //       "from ::: ",
  //       `0 0 ${chartContainer.clientWidth * k * proportion} ${parseInt(
  //         chartSvg.getAttribute("viewBox").split(" ")[3]
  //       )}`
  //     );

  //     console.log(
  //       "to ::: ",
  //       `0 0 ${chartContainer.clientWidth * k * proportion} ${maxY}`
  //     );

  //     viewBoxAnimation.setAttribute(
  //       "from",
  //       `0 0 ${chartContainer.clientWidth * k * proportion} ${parseInt(
  //         chartSvg.getAttribute("viewBox").split(" ")[3]
  //       )}`
  //     );

  //     viewBoxAnimation.setAttribute(
  //       "to",
  //       `0 0 ${chartContainer.clientWidth * k * proportion} ${maxY}`
  //     );

  //     viewBoxAnimation.beginElement();
  //   } else if (
  //     chartContainer.clientWidth * k * proportion !==
  //     chartSvg.getAttribute("viewBox").split(" ")[2]
  //   ) {
  //     console.log(
  //       `0 0 ${chartContainer.clientWidth * k * proportion} ${maxY}`,
  //       chartSvg.getAttribute("viewBox").split(" ")[2]
  //     );
  //     // viewBoxAnimation.setAttribute(
  //     //   "from",
  //     //   `0 0 ${chartContainer.clientWidth * k * proportion} ${maxY}`
  //     // );

  //     // viewBoxAnimation.setAttribute(
  //     //   "to",
  //     //   `0 0 ${chartContainer.clientWidth * k * proportion} ${maxY}`
  //     // );
  //     chartSvg.setAttribute(
  //       "viewBox",
  //       `0 0 ${chartContainer.clientWidth * k * proportion} ${maxY}`
  //     );

  //     // viewBoxAnimation.beginElement();
  //   }
  // } else {
  //   console.log("bbb");
  //   chartSvg.setAttribute(
  //     "viewBox",
  //     `0 0 ${chartContainer.clientWidth * k * proportion} ${maxY}`
  //   );

  //   // console.log(`0 0 ${chartContainer.clientWidth * k * proportion} ${maxY}`);

  //   // viewBoxAnimation.setAttribute(
  //   //   "from",
  //   //   `0 0 ${chartContainer.clientWidth * k * proportion} ${maxY}`
  //   // );

  //   // viewBoxAnimation.setAttribute(
  //   //   "to",
  //   //   `0 0 ${chartContainer.clientWidth * k * proportion} ${maxY}`
  //   // );

  //   // viewBoxAnimation.beginElement();

  //   // viewBoxAnimation.setAttribute(
  //   //   "from",
  //   //   `0 0 ${chartContainer.clientWidth * k * proportion} ${parseInt(
  //   //     viewBoxAnimation.getAttribute("to").slice(-3)
  //   //   )}`
  //   // );
  //   // viewBoxAnimation.beginElement();
  //   // viewBoxAnimation.setAttribute(
  //   //   "to",
  //   //   `0 0 ${chartContainer.clientWidth * k * proportion} ${maxY}`
  //   // );
  // }

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

  chartPaths.forEach(({ pathName, d }) => {
    const path = document.querySelector(`path#${pathName}`);
    // console.log(path);

    if (path) {
      const a = path.firstChild;

      //   path.removeChild(path.firstChild);

      if (a.getAttribute("to") !== d) {
        a.setAttribute("from", d);
        a.setAttribute("to", d);
        document.querySelector(`path#${pathName} animate`).beginElement();
      }

      //   path.appendChild(a);
    } else {
      // p = path, a = animation
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const a = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "animate"
      );

      p.setAttribute("id", pathName);
      p.setAttribute("fill", "transparent");
      p.setAttribute("stroke", chartData.colors[pathName]);
      p.setAttribute("stroke-width", 2 * (maxY / chartSvg.clientHeight));
      p.setAttribute("stroke-linejoin", "round");

      a.setAttribute("attributeName", "d");
      a.setAttribute("fill", "freeze");
      a.setAttribute("dur", "250ms");
      a.setAttribute("repeatCount", "1");
      a.setAttribute("begin", "indefinite");
      //   a.setAttribute("values", `${d};${d}`);

      a.setAttribute("from", d);
      a.setAttribute("to", d);

      p.appendChild(a);
      shartG.appendChild(p);

      document.querySelector(`path#${pathName} animate`).beginElement();
    }
  });

  // Remove other(previous) chart paths
  // while (shartG.firstChild) {
  //   shartG.removeChild(shartG.firstChild);
  // }

  // chartPaths.forEach(({ pathName, d }) => {
  //   const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  //   path.setAttribute("d", d);
  //   path.setAttribute("fill", "transparent");
  //   path.setAttribute("stroke", chartData.colors[pathName]);
  //   path.setAttribute("stroke-width", 2 * (maxY / chartSvg.clientHeight));
  //   path.setAttribute("stroke-linejoin", "round");

  //   shartG.appendChild(path);
  // });
};

export default renderChart;
