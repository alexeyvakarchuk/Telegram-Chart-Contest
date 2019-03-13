import fetchChartData from "scripts/fetchChartData";

const init = async () => {
  const data = await fetchChartData();

  const firstChardData = data[0];

  const maxXFirstChart = firstChardData.columns[0].length;
  const maxYFirstChart =  Math.max.apply(null, firstChardData.columns[1].slice(1));

  const minChart = document.querySelector('.min-chart');
  const minChartSvg = document.querySelector('.minChartSvg');

  const widthMinSvg = minChartSvg.offsetWidth;
  minChartSvg.setAttribute('viewBox', `0 0 ${maxXFirstChart} ${maxYFirstChart}`)
  // minChartSvg.setAttribute('width', maxYFirstChart);
  // minChartSvg.setAttribute('height', maxXFirstChart);
  
  let x = 1;

  firstChardData.columns[1].slice(1).forEach((element) => {
    let circl = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circl.setAttribute("cx", x);
    circl.setAttribute("cy", element);
    circl.setAttribute("r", 1);
    minChartSvg.appendChild(circl);
    x++;
  });

  console.log(firstChardData);
  console.log(maxYFirstChart);
  console.log(maxXFirstChart);
  console.log(minChartSvg.clientWidth);
  return {

  }
  // Math.max.apply(null, data[0].columns[1].slice(1))
};

export default init;
