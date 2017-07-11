var t = 0, x = 104, y = 24;
function TIC() {
    if (btn(0))
        y--;
    if (btn(1))
        y++;
    if (btn(2))
        x--;
    if (btn(3))
        x++;
    cls(12);
    spr(1 + (t % 60) / 30, x, y, -1, 4);
    print("HELLO WORLD!", 84, 64);
    t++;
}
