var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var array = [];
var blocks;

var w = canvas.width;
var h = canvas.height;
var k = 0;
var k1 = 0;
var size = 0;
var size2 = -1;
var x_gen = 130;
var y_gen = 650;
var x = 220;
var move = 48;
var x_geng = 130;
var y_geng = 597;
var y = h / 2 + 20;
var count = 0
var cap = 1;
var cap2 = 1;
var gr_bl = 1;
var was_block = 0;
var fblockCoord = {
  x: 0,
  y: 0
};
var fblockCoord2 = {
  x: 0,
  y: 0
};
var c = 2;
var c2 = 2;
writeMessage(canvas, "Обозначения:", w - 270, 50, "#000000", '20pt Calibri');
writeMessage(canvas, "* Другие объекты в памяти: ", w - 320, 80, "#000000");
writeMessage(canvas, "* Вектор: ", w - 240, 120, "#000000");
writeMessage(canvas, "Ф(i) = 2*size - capacity", w - 260, 160, "#000000", '15pt Calibri');
writeMessage(canvas, "Реальная стоимость операций:", w - 310, 180, "#000000", '15pt Calibri');
writeMessage(canvas, "* push: 1 если size + 1 < capacity", w - 320, 205, "#000000");
writeMessage(canvas, "* push: size если size + 1 = capacity", w - 335, 225, "#000000");
blocks = init(canvas);
var realoc = [
  [blocks[3][0] - 160, blocks[3][1] + 100],
  [5, 580],
  [blocks[2][0] + blocks[2][2] + 10, blocks[2][1] + blocks[2][3] - move],
  // [blocks[1][0] + blocks[1][2] + 10, blocks[2][1] - 50]
  [550, h / 2 + 90]
];

function init(canvas) {
  var ctx = canvas.getContext('2d');
  ctx.lineWidth = 2;
  var x1 = w - 100;
  var y1 = 90;
  var size = 15;
  ctx.fillStyle = '#008000';
  ctx.fillRect(w - 70, 65, 20, 20);
  ctx.fillRect(270, h / 2 + 160, 200, 250); //блок внизу слева
  ctx.fillRect(19, 100, 200, 300); // вертикальная полоса слева
  ctx.fillRect(421, h / 2 - 80, 500, 110); //длинная полоса по центруv
  ctx.fillRect(w - 560, 10, 200, 170); // блок сверху справа
  ctx.fillRect(w - 300, h - 210, 250, 200); //блок снизу справа
  var block = [
    //[x, y, len_x, len_y]
    [270, h / 2 + 120, 200, 250],
    [19, 100, 200, 300],
    [421, h / 2 - 80, 500, 110],
    [w - 560, 10, 200, 170],
    [w - 300, h - 210, 250, 200]
  ];
  return block;
}
function del_pattern(numb) {
  var bl = {
    top: 94,
    left: 1272
  };
  window["b" + numb].style.left = bl.left + 'px';
  window["b" + numb].style.top = bl.top + 'px';
}

function realocation(ctx, s, x_pos, y_pos) {
  if (k >= 4) {
    alert("нет места для выделения нужной памяти");
    return 1;
  }
  alert("не достаточно памяти, нужна реалокация");
  var x_temp = realoc[k][0];
  var y_temp = realoc[k][1];
  var x_t = x_temp + move + 1;
  var y_t = y_temp;
  for (var i = 1; i <= 2 * cap; ++i) {
    gr_bl = 1;
    var bl = {
      top: y_t,
      left: x_t
    };
    window["b" + i].style.left = bl.left + 'px';
    window["b" + i].style.top = bl.top + 'px';
    x_t += move;
  }
  let blCoords = {
    top: y_temp,
    left: x_temp
  };
  window["bl" + '1'].style.left = blCoords.left + 'px';
  window["bl" + '1'].style.top = blCoords.top + 'px';
  cap *= 2;
  writeMessage(canvas, "cap=" + cap, x_temp + 3, y_temp + 35, "black", '10pt Calibri')
  ctx.clearRect(fblockCoord.x, fblockCoord.y, move, move);
  fblockCoord.x = x_temp;
  fblockCoord.y = y_temp;
  if (size == cap) {
    writeMessage(canvas, "sz=" + size, fblockCoord.x + 6, fblockCoord.y + 20, "red", '10pt Calibri')
  } else {
    writeMessage(canvas, "sz=" + size, x_temp + 6, y_temp + 20, "black", '10pt Calibri')
  }
  x_temp += move;
  var res;
  var sz_2 = Math.floor((size - 1) / 2);
  for (var i = 0; i < size; ++i) {
    if (i != size - 1) {
      window["bl" + (i + 2)].style.transition = "1s";
    }
    if (i != 0 && i != size - 1) {
      setTimeout(draw_square, 700 * i + 500, canvas, array[i], x_temp, y_temp, move, 1, i, x_pos, y_pos);
      setTimeout(del_el2, 700 * i + 550, ctx, x_pos - (size - 1 - i) * move, y_pos)
    } else if (i != size - 1) {
      setTimeout(draw_square, 200, canvas, array[i], x_temp, y_temp, move, 1, i, x_pos, y_pos);
      setTimeout(del_el2, 200, ctx, x_pos - (size - 1 - i) * move, y_pos)
    } else {
      setTimeout(draw_square, 850 * (size - 1) + 230, canvas, array[i], x_temp, y_temp, move, 1, i, x_pos, y_pos);
    }
    x_temp += move;
  }
  ++k;
  ++c;
  return {
    x: x_temp,
    y: y_temp
  };
}

function del_el(ctx, x, y) {
  ctx.clearRect(x, y, 30, 40);
}
function del_el2(ctx, x, y) {
  ctx.fillStyle = '#c0c0c0';
  ctx.fillRect(x - 2, y - 2, move, move);
}


function draw_square(canvas, num, x, y, side = move, if_real = 0, ind) {
  var ctx = canvas.getContext('2d');
  for (var i = 0; i < 5; i++) {
    if ((blocks[i][0] < (x + side) && blocks[i][0] + blocks[i][2] > (x + side) &&
        blocks[i][1] <= y && blocks[i][1] + blocks[i][3] >= y) || (x + side > w)) {
      var res1 = realocation(ctx, side, x, y);
      was_block = 1;
      x_gen = res1.x;
      y_gen = res1.y;
      return;
    }
  }
  if (if_real == 1 && ind != size - 1) {
    setTimeout(del_pattern, 900, gr_bl);
    ++gr_bl;
  } else {
    setTimeout(del_pattern, 100, gr_bl);
    ++gr_bl;
  }
  if (size == 1) {
    let blCoords = {
      top: y,
      left: x
    };
    window["bl" + '1'].style.left = blCoords.left + 'px';
    window["bl" + '1'].style.top = blCoords.top + 'px';
    writeMessage(canvas, "sz=" + size, x + 6, y + 20, "red", '10pt Calibri')
    writeMessage(canvas, "cap=" + cap, x + 3, y + 35, "black", '10pt Calibri')
    fblockCoord.x = x;
    fblockCoord.y = y;
    x_gen += move;
    x += move;
  } else {
    if (if_real == 0) {
      ctx.clearRect(fblockCoord.x + 6, fblockCoord.y + 9, 31, 15);
      if (size == cap) {
        writeMessage(canvas, "sz=" + size, fblockCoord.x + 6, fblockCoord.y + 20, "red", '10pt Calibri')
      } else {
        writeMessage(canvas, "sz=" + size, fblockCoord.x + 6, fblockCoord.y + 20, "black", '10pt Calibri')
      }
    }
  }
  let blCoords = {
    top: y,
    left: x
  };
  if (if_real != 0) {
    ind += 2;
    window["bl" + ind].style.left = blCoords.left + 'px';
    window["bl" + ind].style.top = blCoords.top + 'px';
    setTimeout(writeMessage, 700, canvas, num, x + 17, y + 30, "black")
  } else {
    window["bl" + c].style.left = blCoords.left + 'px';
    window["bl" + c].style.top = blCoords.top + 'px';
    ++c;
    writeMessage(canvas, num, x + 17, y + 30, "black")
  }
  x_gen = x + side;
  y_gen = y;
}

function redraw_green(x_old, y_old) {
  let x_temp = realoc[k1][0];
  let y_temp = realoc[k1][1] - move - 5;
  let blCoords = {
    top: y_temp,
    left: x_temp
  };
  window["blo" + '1'].style.left = blCoords.left + 'px';
  window["blo" + '1'].style.top = blCoords.top + 'px';
  cap2 *= 2;
  writeMessage(canvas, "cap=" + cap2, x_temp + 3, y_temp + 35, "black", '10pt Calibri')
  ctx.clearRect(fblockCoord2.x, fblockCoord2.y, move, move);
  fblockCoord2.x = x_temp;
  fblockCoord2.y = y_temp;
  if (size2 == cap2) {
    writeMessage(canvas, "sz=" + size2, fblockCoord2.x + 6, fblockCoord2.y + 20, "red", '10pt Calibri')
  } else {
    writeMessage(canvas, "sz=" + size2, x_temp + 6, y_temp + 20, "black", '10pt Calibri')
  }
  x_temp += move;
  for (let l = 0; l < size2; ++l) {
    draw_square_green(canvas, array[l], x_temp, y_temp, move, 1, l);
    x_temp += move;
    del_el(ctx, x_old - (size2 - l) * move, y_old);
  }
  ++k1;
  ++c2;
  return {
    x: x_temp,
    y: y_temp
  };
}

function draw_square_green(canvas, num, x, y, side = move, if_real = 0, ind) {
  var ctx = canvas.getContext('2d');
  for (var i = 0; i < 5; i++) {
    if ((blocks[i][0] < (x + side) && blocks[i][0] + blocks[i][2] > (x + side) &&
        blocks[i][1] <= y && blocks[i][1] + blocks[i][3] >= y) || (x + side > w)) {
      let res1 = redraw_green(x, y);
      x_geng = res1.x;
      y_geng = res1.y;
      return;
    }
  }
  if (size2 == 0) {
    let blCoords = {
      top: y,
      left: x
    };
    window["blo" + '1'].style.left = blCoords.left + 'px';
    window["blo" + '1'].style.top = blCoords.top + 'px';
    writeMessage(canvas, "sz=" + size2, x + 6, y + 20, "black", '10pt Calibri')
    writeMessage(canvas, "cap=" + cap2, x + 3, y + 35, "black", '10pt Calibri')
    fblockCoord2.x = x;
    fblockCoord2.y = y;
  } else {
    if (if_real == 0) {
      ctx.clearRect(fblockCoord2.x + 6, fblockCoord2.y + 9, 31, 15);
      if (size2 == cap2) {
        writeMessage(canvas, "sz=" + size2, fblockCoord2.x + 6, fblockCoord2.y + 20, "red", '10pt Calibri')
      } else {
        writeMessage(canvas, "sz=" + size2, fblockCoord2.x + 6, fblockCoord2.y + 20, "black", '10pt Calibri')
      }
    }
    let blCoords = {
      top: y,
      left: x
    };
    if (if_real != 0) {
      ind += 2;
      window["blo" + ind].style.left = blCoords.left + 'px';
      window["blo" + ind].style.top = blCoords.top + 'px';
      writeMessage(canvas, num, x + 17, y + 30, "black");
    } else {
      window["blo" + c2].style.left = blCoords.left + 'px';
      window["blo" + c2].style.top = blCoords.top + 'px';
      ++c2;
      writeMessage(canvas, array[size - 2], x + 17, y + 30, "black")
    }
  }
  x_geng = x + side;
  y_geng = y;
}

function print() {
  ctx.clearRect(490, h / 2 - 110, 390, 26);
  writeMessage(canvas, "c' = 1 + ", 500, h / 2 - 90, "black");
  writeMessage(canvas, "Ф(стало)", 565, h / 2 - 90, "red");
  writeMessage(canvas, " - ", 640, h / 2 - 90, "black");
  writeMessage(canvas, "Ф(было) ", 657, h / 2 - 90, "green");
  writeMessage(canvas, " = ", 730, h / 2 - 90, "black");
  writeMessage(canvas, "1 + " + (2 * size - cap), 748, h / 2 - 90, "black");
  if (2 * size2 - cap2 >= 0) {
    var mess = " - ";
  } else {
      var mess = " + ";
  }
  if (2 * size - cap >= 10) {
    writeMessage(canvas, mess + (Math.abs(2 * size2 - cap2)) + " = " + (2 * size - cap - 2 * size2 + cap2 + 1), 800, h / 2 - 90, "black");
  } else {
      writeMessage(canvas, mess + (Math.abs(2 * size2 - cap2)) + " = " + (2 * size - cap - 2 * size2 + cap2 + 1), 788, h / 2 - 90, "black");
  }
}

function print2() {
  ctx.clearRect(490, h / 2 - 110, 390, 26);
  writeMessage(canvas, "c' = " + size + " + ", 500, h / 2 - 90, "black");
  writeMessage(canvas, "Ф(стало)", 565, h / 2 - 90, "red");
  writeMessage(canvas, " - ", 640, h / 2 - 90, "black");
  writeMessage(canvas, "Ф(было) ", 657, h / 2 - 90, "green");
  writeMessage(canvas, " = ", 730, h / 2 - 90, "black");
  writeMessage(canvas, size + " + " + (2 * size - cap), 748, h / 2 - 90, "black");
  writeMessage(canvas, " - " + (Math.abs(2 * size2 - cap2)) + " = " + (2 * size - cap - 2 * size2 + cap2 + size), 788, h / 2 - 90, "black");
}

function insert() {
  var num = document.getElementById("number").value
  document.getElementById("number").value = "";
  if (parseInt(num) == num) {
    if (num >= 10 || num < 0) {
      alert("число не удовлетворяет ограничениям");
      return;
    }
    array.push(num);
    ++size2;
    ++size;
    draw_square_green(canvas, num, x_geng, y_geng);
    if (size - 1 == cap) {
      setTimeout(print2, 90);
    } else {
      setTimeout(print, 80);
    }
    setTimeout(draw_square, 80, canvas, num, x_gen, y_gen);
  } else {
    alert("число не удовлетворяет ограничениям");
  }
}

function writeMessage(canvas, message, x, y, colour, font = '15pt Calibri') {
  var ctx = canvas.getContext('2d');
  ctx.font = font;
  ctx.fillStyle = colour;
  ctx.fillText(message, x, y);
}
