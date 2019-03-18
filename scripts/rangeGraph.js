let box =  document.querySelector('.box');
let coords, shiftX;
let boxL = document.querySelector('.box__l');

//Функция которая ставит область в конец родителя при инициализации
function firstPosition(elem) {
  // console.log(elem.clientWidth);
  // console.log(elem.parentNode.clientWidth);
  elem.style.left = elem.parentNode.clientWidth - elem.clientWidth + 'px';
}

firstPosition(box);

//Ф-ция которая будет выдавать смещение относительно родительского узла
function getCoords(elem) { 
  console.log(elem.offsetLeft);
  return {
    left: elem.offsetLeft
  }
};

//Ф-ция которая будет управлять движением и устанавливать новые координаты
function moveAt(e) {
  console.log(e.pageX - shiftX);
  console.log("shiftX: " + shiftX);
  console.log("e.pageX: " + e.pageX);
  if(e.pageX - shiftX <= 0) {
    e.target.style.left = '0px'
  } else if (e.pageX - shiftX >= e.target.parentNode.clientWidth - e.target.clientWidth) {
    e.target.style.left = e.target.parentNode.clientWidth - e.target.clientWidth + 'px'
  } else {
    e.target.style.left = e.pageX - shiftX + 'px';
  }
};

box.addEventListener('mousedown', (e) => {
  coords = getCoords(e.target);
  shiftX = e.pageX - coords.left;

  document.onmousemove = function(e) {
    moveAt(e);
  };

  document.onmouseup = function() {
    document.onmousemove = document.onmouseup = null;
  };
});

boxL.addEventListener('mousedown' , (e) => {
    e.stopPropagation(); 
    let startPos = e.target.parentNode.offsetLeft;
    let startWidth = e.target.parentNode.clientWidth;
    console.log(startPos);

    boxL.onmousemove = (e) => {

        e.target.parentNode.style.left = e.pageX - e.target.clientWidth + 'px';
        console.log(startPos) 
        console.log(startPos - e.target.parentNode.offsetLeft) 
        e.target.parentNode.style.width =  startWidth +  startPos - e.target.parentNode.offsetLeft + 'px';
    }
    boxL.onmouseup = (e) => {
        boxL.onmousemove = boxL.onmouseup = null;
    }
})