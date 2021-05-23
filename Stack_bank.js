var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var array = [];
var w = canvas.width;
var h = canvas.height;
var size = 0;
var x_gen = w / 2 - 10;
var y_gen = h - 30;
var move = 50;
var count = 0
var c = 1;
writeMessage(canvas, count + " coins", 160, h / 2 - 150, "#DAA520");
var image1 = document.getElementById('bank');
writeMessage(canvas, "Стоимость операций:", w - 275, 50, "#000000", '20pt Calibri');
writeMessage(canvas, "* push: 2 coins", w - 200, 70, "#000000");
writeMessage(canvas, "* pop: 0 coins", w - 200, 90, "#000000");

function draw_square(canvas, num, x, y) {
  var ctx = canvas.getContext('2d');
  var image = document.getElementById('source');
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + move, y);
  ctx.lineTo(x + move, y - move);
  ctx.lineTo(x, y - move);
  ctx.lineTo(x, y);
  writeMessage(canvas, num, x, y, "black")
  ctx.stroke();
  count += 1;
  ctx.clearRect(180, h / 2 - 185, 70, 20);
  writeMessage(canvas, count + " coins", 160, h / 2 - 150, "#DAA520");
  return {
    x: x,
    y: y - move
  };
}

function insert() {
  var num = document.getElementById("number").value
  if (parseInt(num) == num) {
    if (num >= 10 || num < 0) {
      alert("число не удовлетворяет ограничениям");
      document.getElementById("number").value = "";
      return
    }
    size += 1;
    if (size > 13) {
      alert("не достаточно места");
      document.getElementById("number").value = "";
      return;
    }
    let ballCoords = {
      top: y_gen - 35,
      left: x_gen + move + 20
    };
    let ballCoords2 = {
      top: y_gen - 35,
      left: x_gen + move + 60
    };
    // window["ball" + c].style.filter = 'hue-rotate(0deg)';
    ball14.style.transition = "1s";

    window["ball" + c].style.left = ballCoords.left + 'px';
    window["ball" + c].style.top = ballCoords.top + 'px';
    ++c;
    window["ball" + '14'].style.left = ballCoords2.left + 'px';
    window["ball" + '14'].style.top = ballCoords2.top + 'px';
    array.push(num);
    var res = draw_square(canvas, num, x_gen, y_gen);
    x_gen = res.x;
    y_gen = res.y;
    setTimeout(change_colour, 1000, window["ball" + '14']);
    setTimeout(delet_money, 1800, window["ball" + '14']);
  } else {
    alert("число не удовлетворяет ограничениям");
  }
  document.getElementById("number").value = "";
}

function delet_money(mon) {
  mon.style.transition = "0s";
  mon.style.left = 1100 + 'px';
  mon.style.top = 280 + 'px';
  mon.style.filter = 'hue-rotate(0deg)';
}

function change_colour(mon) {
  mon.style.filter = 'hue-rotate(320deg)';
}

function POP() {
  var num = document.getElementById("clearButton").value
  if (parseInt(num) == num) {
    if (size < num) {
      alert("не достаточно элементов в стеке")
    } else {
      for (var j = 0; j < num; ++j) {
          --c;
          setTimeout(change_colour, 1200 * j, window["ball" + c]);
          setTimeout(delet_money, 1200 * j + 900, window["ball" + c]);
          setTimeout(remove_square, 1200 * j + 1100, canvas, num, x_gen, y_gen);
          y_gen += move;
      }
    }
  } else {
    alert("число не удовлетворяет ограничениям");
  }
  document.getElementById("clearButton").value = "";
}

function remove_square(canvas, num, x, y) {
  var ctx = canvas.getContext('2d');
  if (size == 1) {
    ctx.clearRect(x - 1, y - 1, move + 2, move + 2);
  } else {
    ctx.clearRect(x - 1, y - 1, move + 2, move);
  }
  --size;
  --count;
  array.pop;
  ctx.clearRect(180, h / 2 - 185, 70, 20);
  writeMessage(canvas, count + " coins", 160, h / 2 - 150, "#DAA520");
}

function writeMessage(canvas, message, x, y, colour, font = '15pt Calibri') {
  var ctx = canvas.getContext('2d');
  ctx.font = font;
  ctx.fillStyle = colour;
  ctx.fillText(message, x + move / 2 - 5, y - move / 2 + 5);
}
