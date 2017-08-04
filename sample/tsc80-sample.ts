let
  t = 0,
  x,
  y;

function TIC() {

  // Small hack to ensure that everything is loaded before init() call
  if (t == 0) {
    init();
  }

  if (btn(0)) y--;
  if (btn(1)) y++;
  if (btn(2)) x--;
  if (btn(3)) x++;

  cls(12);
  spr(1 + (t % 60) / 30, x, y, -1, 4);
  print("HELLO WORLD!", 84, 64);
  t++;
}

function init() {
  x = 104;
  y = 24;
}