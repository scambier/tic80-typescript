let t: number = 0;
let x: number;
let y: number;

function TIC(): void {
  // small trick to ensure that everything is loaded before init() call
  if (t === 0) {
    init();
  }

  if (btn(0)) {
    y--;
  }
  if (btn(1)) {
    y++;
  }
  if (btn(2)) {
    x--;
  }
  if (btn(3)) {
    x++;
  }

  cls(13);
  spr(1 + Math.floor((t % 60) / 30) * 2, x, y, 14, 3, 0, 0, 2, 2);
  print("HELLO WORLD!", 84, 84);
  t++;
}

function init(): void {
  x = 96;
  y = 24;
}
