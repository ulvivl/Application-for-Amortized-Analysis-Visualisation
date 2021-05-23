var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var array = [];
var blocks;
const screenWidth = window.screen.width
const screenHeight = window.screen.height
document.getElementById('myCanvas').height = screenHeight - 200;
document.getElementById('myCanvas').width = screenWidth - 20;
var w = canvas.width;
var h = canvas.height;
var k = 0;
var size = 0;
x_gen = 130;
y_gen = 650;
var x = 220;
var move = 50;
var y = h / 2 + 20;
var count = 0
var cap = 1;
var c = 2;
var mon = 2;
var have_mon = 40;
var the_end = 0;
var gr_bl = 1;
var fblockCoord = {
  x: 0,
  y: 0
};
writeMessage(canvas, "Обозначения:", w - 270, 50, "#000000", '20pt Calibri');
writeMessage(canvas, "* Другие объекты в памяти: ", w - 320, 80, "#000000");
writeMessage(canvas, "* Вектор: ", w - 240, 120, "#000000");
blocks = init(canvas);
var realoc = [
  [blocks[3][0] - 160, blocks[3][1] + 100],
  [5, blocks[0][1] + 50],
  [blocks[2][0] + blocks[2][2] + 10, blocks[2][1] + blocks[2][3] - 80],
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
function realocation(ctx, s, x_pos, y_pos) {
  if (k >= 4) {
    alert("нет места для выделения нужной памяти");
    the_end = 1;
    return 1;
  }
  alert("не достаточно памяти, нужна реалокация");
  var x_temp = realoc[k][0];
  var y_temp = realoc[k][1];
  var x_t = x_temp + move;
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
  var mon_num;
  for (var i = 0; i < size; ++i) {
    if (i != size - 1) {
      window["bl" + (i + 2)].style.transition = "1s";
    }
    if (i >= sz_2) {
      mon_num = 2 * i + 2;
    } else {
      mon_num = (size - 1) + 2 * i + 1;
    }
    if (i != 0 && i != size - 1) {
      setTimeout(change_colour, 2000 * i, window["mon" + mon_num]);
      setTimeout(delet_money, 2000 * i + 1000, window["mon" + mon_num]);
      setTimeout(draw_square, 2000 * i + 1500, canvas, array[i], x_temp, y_temp, move, 1, i, x_pos, y_pos);
      setTimeout(del_el, 2000 * i + 1550, ctx, x_pos - (size - 1 - i) * move, y_pos)
    } else if (i != size - 1) {
      change_colour(window["mon" + mon_num]);
      setTimeout(delet_money, 1000, window["mon" + mon_num]);
      setTimeout(draw_square, 1500, canvas, array[i], x_temp, y_temp, move, 1, i, x_pos, y_pos);
      setTimeout(del_el, 1500, ctx, x_pos - (size - 1 - i) * move, y_pos)
    } else {
      setTimeout(draw_square, 2200 * (size - 1), canvas, array[i], x_temp, y_temp, move, 1, i, x_pos, y_pos);
    }
    x_temp += move;
  }
  ++c;
  ++k;
  return {
    x: x_temp,
    y: y_temp
  };
}
function del_pattern(numb) {
  var bl = {
    top: 11,
    left: 90
  };
  window["b" + numb].style.left = bl.left + 'vw';
  window["b" + numb].style.top = bl.top + 'vh';
}
function delet_money(mon) {
  mon.style.transition = "0s"; //не так
  mon.style.left = 945 + 'px';
  mon.style.top = 50 + 'px';
  mon.style.filter = 'hue-rotate(0deg)';
}

function change_colour(mon) {
  mon.style.filter = 'hue-rotate(320deg)';
}

function del_el(ctx, x, y) {
  ctx.fillStyle = '#c0c0c0';
  ctx.fillRect(x - 2, y - 2, move, move);
}


function draw_square(canvas, num, x, y, side = move, if_real = 0, ind, x_old, y_old) {
  var ctx = canvas.getContext('2d');
  var was_block = 0;
  for (var i = 0; i < 5; i++) {
    if ((blocks[i][0] < (x + side) && blocks[i][0] + blocks[i][2] > (x + side) &&
        blocks[i][1] <= y && blocks[i][1] + blocks[i][3] >= y) || (x + side > w)) {
      var res1 = realocation(ctx, side, x, y);
      if (the_end == 1) {
        return 1;
      }
      was_block = 1;
      return {
        x: res1.x,
        y: res1.y
      };
    }
  }
  setTimeout(del_pattern, 900, gr_bl);
  ++gr_bl;
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
        if (size > cap) {
          cap *= 2;
          ctx.clearRect(fblockCoord.x + 3, fblockCoord.y + 25, 40, 40);
          writeMessage(canvas, "cap=" + cap, fblockCoord.x + 3, fblockCoord.y + 35, "black", '10pt Calibri');
        }
        writeMessage(canvas, "sz=" + size, fblockCoord.x + 6, fblockCoord.y + 20, "black", '10pt Calibri')
      }
    }
  }
  let monCoords1 = {
    top: y - 20,
    left: x + 5
  };
  let monCoords2 = {
    top: y - 20,
    left: x + 30
  };
  let blCoords = {
    top: y,
    left: x
  };
  if (mon > have_mon) {
    mon = mon % have_mon;
  }
  if (if_real != 0) {
    if (ind == size - 1) {
      window["mon" + mon].style.transition = '1s';
      window["mon" + mon].style.left = monCoords1.left + 'px';
      window["mon" + mon].style.top = monCoords1.top + 'px';
      ++mon;
      window["mon" + mon].style.transition = '1s';
      window["mon" + mon].style.left = monCoords2.left + 'px';
      window["mon" + mon].style.top = monCoords2.top + 'px';
      ++mon;
    }
    ind += 2;
    window["bl" + ind].style.left = blCoords.left + 'px';
    window["bl" + ind].style.top = blCoords.top + 'px';
    setTimeout(writeMessage, 100, canvas, num, x + 17, y + 30, "black")
  } else {
    window["bl" + c].style.left = blCoords.left + 'px';
    window["bl" + c].style.top = blCoords.top + 'px';
    ++c;
    window["mon" + mon].style.transition = '1s';
    window["mon" + mon].style.left = monCoords1.left + 'px';
    window["mon" + mon].style.top = monCoords1.top + 'px';
    ++mon;
    if (size != 1) {
      window["mon" + mon].style.transition = '1s';
      window["mon" + mon].style.left = monCoords2.left + 'px';
      window["mon" + mon].style.top = monCoords2.top + 'px';
      ++mon;
    }
    writeMessage(canvas, num, x + 17, y + 30, "black")
  }
  return {
    x: x + side,
    y: y
  };
}
function insert() {
  if (the_end == 1) {
    return 0;
  }
  var num = document.getElementById("number").value
  document.getElementById("number").value = "";
  if (parseInt(num) == num) {
    if (num >= 10 || num < 0) {
      alert("число не удовлетворяет ограничениям");
      return;
    }
    array.push(num);
    ++size;
    var res = draw_square(canvas, num, x_gen, y_gen);
    if (the_end == 1) {
      return 0;
    }
    x_gen = res.x;
    y_gen = res.y;
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
