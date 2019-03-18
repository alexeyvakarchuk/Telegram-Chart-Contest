const minChart = document.querySelector(".min-chart");

const box = document.querySelector(".box");
const boxL = document.querySelector(".box__l");
let coords, shiftX;

//Функция которая ставит область в конец родителя при инициализации
function firstPosition(elem) {
  // console.log(elem.clientWidth);
  // console.log(elem.parentNode.clientWidth);
  elem.style.left = elem.parentNode.clientWidth - elem.clientWidth + "px";
}

firstPosition(box);

//Ф-ция которая будет выдавать смещение относительно родительского узла
const getCoords = el => {
  const { top, left } = el.getBoundingClientRect();

  return {
    top: top + pageYOffset,
    left: left + pageXOffset
  };
};

//Ф-ция которая будет управлять движением и устанавливать новые координаты
function moveAt(e) {
  console.log(e.pageX - shiftX);
  console.log("shiftX: " + shiftX);
  console.log("e.pageX: " + e.pageX);
  if (e.pageX - shiftX <= 0) {
    e.target.style.left = "0px";
  } else if (
    e.pageX - shiftX >=
    e.target.parentNode.clientWidth - e.target.clientWidth
  ) {
    e.target.style.left =
      e.target.parentNode.clientWidth - e.target.clientWidth + "px";
  } else {
    e.target.style.left = e.pageX - shiftX + "px";
  }
}

box.addEventListener("mousedown", e => {
  coords = getCoords(e.target);
  shiftX = e.pageX - coords.left;

  document.onmousemove = function(e) {
    moveAt(e);
  };

  document.onmouseup = function() {
    document.onmousemove = document.onmouseup = null;
  };
});

// *** Left corner drag ***

boxL.onmousedown = e => {
  e.stopPropagation();

  const boxOffsetLeft = box.offsetLeft;
  const boxtWidth = box.clientWidth;

  const minChartWidth = minChart.offsetWidth;
  const shiftX = e.pageX - getCoords(boxL).left;

  document.onmousemove = e => {
    const left = e.pageX - 15 - shiftX;
    const width = boxOffsetLeft + boxtWidth - left;

    if (left > 0 && width > 100) {
      box.style.left = `${left}px`;
      box.style.width = `${width}px`;
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
  };
};

boxL.ondragstart = null;
