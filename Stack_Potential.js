var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var array = [];
var w = canvas.width;
var h = canvas.height;
var i = 10;
var j = 0;
var size = 0;
var x = w / 2 + 5;
var y = h - 30;
var x_new = w / 2 - 55;
var y_new = h - 30;
var move = 50;
writeMessage(canvas, "Ф(i) = количество элементов в iый момент", w - 400, 50, "#000000", '15pt Calibri');
writeMessage(canvas, "Реальная стоимость операций:", w - 325, 70, "#000000", '15pt Calibri');
writeMessage(canvas, "* push: 1", w - 240, 90, "#000000");
writeMessage(canvas, "* pop(n): n", w - 240, 110, "#000000");

function draw_square(canvas, num, x, y, x_new, y_new) {
  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + move, y);
  ctx.lineTo(x + move, y - move);
  ctx.lineTo(x, y - move);
  ctx.lineTo(x, y);
  ctx.clearRect(w / 2 - 650, h / 2 - 35, 400, 20);


  var mess = "c'= 1 + "
  writeMessage(canvas, mess, w / 2 - 650, h / 2, "#000000");
  mess = "Ф(стало)"
  writeMessage(canvas, mess, w / 2 - 590, h / 2, "red");
  mess = " - "
  writeMessage(canvas, mess, w / 2 - 515, h / 2, "black");
  mess = "Ф(было)"
  writeMessage(canvas, mess, w / 2 - 500, h / 2, "green");
  mess = " = 1 + "
  writeMessage(canvas, mess + size + " - " + (size - 1) + " = " + 2, w / 2 - 425, h / 2, "#000000");
  writeMessage(canvas, num, x, y, "black")

  ctx.stroke();
  y_new = make_equal(canvas, x, y, x_new, y_new, 1);
  return {
    x: x,
    y: y - move,
    xn: x_new,
    yn: y_new
  };
}

function insert() { // max 12!!
  var num = document.getElementById("number").value
  if (parseInt(num) == num) {
    if (num >= 10 || num < 0) {
        alert("число не удовлетворяет ограничениям");
        return;
    }
    if (size > 12) {
      alert("не достаточно места");
    } else {
      ++size;
      array.push(num);
      var res = draw_square(canvas, num, x, y, x_new, y_new);
      x = res.x;
      y = res.y;
      x_new = res.xn;
      y_new = res.yn;
    }
  } else {
    alert("число не удовлетворяет ограничениям");
  }
  document.getElementById("number").value = "";
}

function make_equal(canvas, x, y, x_new, y_new, from = 0) {
  var temp = y
  while (y_new < temp) {
    if (size == 1 && from == 1) {
      ctx.clearRect(x_new - 1, y_new - 1, move + 2, move + 2);
    } else {
      ctx.clearRect(x_new - 1, y_new - 1, move + 2, move);
    }
    y_new += move;
  }
  while (y_new > temp) {
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(x_new, y_new);
    ctx.lineTo(x_new + move, y_new);
    ctx.lineTo(x_new + move, y_new - move);
    ctx.lineTo(x_new, y_new - move);
    ctx.lineTo(x_new, y_new);
    if (from == 1) {
      writeMessage(canvas, array[size - 2], x_new, y_new, "black")
    } else {
      writeMessage(canvas, array[size - 1], x_new, y_new, "black")
    }
    ctx.stroke();
    y_new -= move;
  }
  return y_new;
}
function POP() {
  var num = document.getElementById("clearButton").value
  if (parseInt(num) == num) {
    if (size < num) {
      alert("Не достаточно элементов в стеке")
    } else {
      y_new = make_equal(canvas, x, y, x_new, y_new);
      var temp = y;
      var num_temp = num;
      var prev_sz = size;
      while (num != 0) {
        var res = remove_square(canvas, num, x, temp, x_new, y_new);
        temp = temp + move;
        num -= 1;
        array.pop();
      }

      ctx.clearRect(w / 2 - 650, h / 2 - 35, 400, 20);
      var mess = "c' = "
      writeMessage(canvas, mess + num_temp + " + ", w / 2 - 650, h / 2, "#000000");
      mess = "Ф(стало)"
      writeMessage(canvas, mess, w / 2 - 585, h / 2, "red");
      mess = " - "
      writeMessage(canvas, mess, w / 2 - 509, h / 2, "black");
      mess = "Ф(было)"
      writeMessage(canvas, mess, w / 2 - 493, h / 2, "green");
      mess = " = "
      writeMessage(canvas, mess + num_temp + " + " + size + " - " + prev_sz + " = " + 0, w / 2 - 420, h / 2, "#000000");

      x = res.x;
      y = res.y;
      x_new = res.xn;
      y_new = res.yn
    }
  } else {
    alert("число не удовлетворяет ограничениям");
  }
  document.getElementById("clearButton").value = "";
}

function remove_square(canvas, num, x, y, x_new, y_new) {
  var ctx = canvas.getContext('2d');
  if (size == 1) {
    ctx.clearRect(x - 1, y - 1, move + 2, move + 2);
  } else {
    ctx.clearRect(x - 1, y - 1, move + 2, move);
  }
  y = y + move;
  size -= 1;
  return {
    x: x,
    y: y,
    xn: x_new,
    yn: y_new
  };
}

function writeMessage(canvas, message, x, y, colour, font = '15pt Calibri') {
  var ctx = canvas.getContext('2d');
  ctx.font = font;
  ctx.fillStyle = colour;
  ctx.fillText(message, x + move / 2 - 5, y - move / 2 + 5);
}
