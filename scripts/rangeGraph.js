const minChart = document.querySelector(".min-chart");
const minChartWidth = minChart.clientWidth;

const box = document.querySelector(".box");
const boxL = document.querySelector(".box__l");
const boxR = document.querySelector(".box__r");

const initialBoxWidth = 150;

// Set's area's left offset to the end of minChart on initialization
const setInitialPosition = el => {
  el.style.width = `${initialBoxWidth}px`;
  el.style.left = `${minChartWidth - initialBoxWidth}px`;
};

setInitialPosition(box);

const getCoords = el => {
  const { top, left } = el.getBoundingClientRect();

  return {
    top: top + pageYOffset,
    left: left + pageXOffset
  };
};

// *** Simple Drag & Drop ***

box.onmousedown = e => {
  const shiftX = e.pageX - getCoords(box).left;

  const boxWidth = box.clientWidth;

  const minLeft = 0;
  const maxLeft = minChartWidth - boxWidth;

  document.onmousemove = e => {
    const left = e.pageX - 15 - shiftX;

    // console.log(left, minChartWidth, boxWidth);

    if (left <= minLeft) {
      box.style.left = "0px";
    } else if (left >= maxLeft) {
      box.style.left = `${maxLeft}px`;
    } else {
      box.style.left = `${left}px`;
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
  };
};

// *** Left corner expand ***

boxL.onmousedown = e => {
  e.stopPropagation();

  const shiftX = e.pageX - getCoords(boxL).left;

  const minLeft = 0;
  const maxLeft = box.offsetLeft + box.clientWidth - 100;

  document.onmousemove = e => {
    const boxOffsetLeft = box.offsetLeft;
    const boxWidth = box.clientWidth;

    let left = e.pageX - 15 - shiftX;

    if (left <= minLeft) {
      left = 0;
      box.style.left = "0px";
    } else if (left >= maxLeft) {
      left = maxLeft;
      box.style.left = `${maxLeft}px`;
    } else {
      box.style.left = `${left}px`;
    }

    const width = boxOffsetLeft + boxWidth - left;

    // console.log(left, width, minChartWidth);

    box.style.width = width > 100 ? `${width}px` : "100px";
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
  };
};

boxL.ondragstart = null;

// *** Right corner expand ***

boxR.onmousedown = e => {
  e.stopPropagation();

  const shiftX = getCoords(boxR).left + boxR.clientWidth - e.pageX;

  document.onmousemove = e => {
    const boxOffsetLeft = box.offsetLeft;
    const boxWidth = box.clientWidth;

    const left = e.pageX - 15 + shiftX;
    const right = minChartWidth - left;

    const width = left - boxOffsetLeft;

    if (right >= 0) {
      box.style.width = width > 100 ? `${width}px` : "100px";
    } else {
      box.style.width = `${minChartWidth - boxOffsetLeft}px`;
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
  };
};

boxR.ondragstart = null;
