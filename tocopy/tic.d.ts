/** @noSelfInFile */

/**
 * Allows you to read the status of one of the buttons attached to TIC. The function returns true if the key with the supplied id is currently in the pressed state. It remains true for as long as the key is held down. If you want to test if a key was just pressed, use btnp instead.
 * @param id the id of the key we want to interrogate, see the key map for reference
 * @returns pressed
 */
declare function btn(id: number): boolean

/**
 * Returns the bitfield of currently pressed buttons
 */
declare function btn(): number

/**
 * Allows you to read the status of one of TIC's buttons. It returns true only if the key has been pressed since the last frame.
 * You can also use the optional hold and period parameters which allow you to check if a button is being held down. After the time specified by hold has elapsed, btnp will return true each time period is passed if the key is still down. For example, to re-examine the state of button '0' after 2 seconds and continue to check its state every 1/10th of a second, you would use btnp(0, 120, 6). Since time is expressed in ticks and TIC runs at 60 frames per second, we use the value of 120 to wait 2 seconds and 6 ticks (ie 60/10) as the interval for re-checking.
 * @param id The id of the key we wish to interrogate - see the key map for reference
 * @param [hold] The time (in ticks) the key must be pressed before re-checking
 * @param [period] The the amount of time (in ticks) after hold before this function will return true again.
 * @returns pressed (but wasn't pressed in previous frame)
 */
declare function btnp(id: number, hold?: number, period?: number): boolean

/**
 * Returns the bitfield of buttons that were pressed the last frame
 */
declare function btnp(): number

/**
 * Limits drawing to a clipping region or 'viewport' defined by x,y,w,h. Things drawn outside of this area will not be visible.
 * Calling clip() with no parameters will reset the drawing area to the entire screen.
 * @param x x coordinate of the top left of the clipping region
 * @param y y coordinate of the top left of the clipping region
 * @param width width of the drawing area in pixels
 * @param height height of the drawing area in pixels
 */
declare function clip(x: number, y: number, width: number, height: number): void

/**
 * Limits drawing to a clipping region or 'viewport' defined by x,y,w,h. Things drawn outside of this area will not be visible.
 * Calling clip() with no parameters will reset the drawing area to the entire screen.
 */
declare function clip(): void

/**
 * Clears the entire screen using the color argument. If no parameter is passed, index 0 of the palette is used.
 * The function is usually called inside TIC(), but isn't mandatory. If you're drawing to the entire screen, for example with sprites, the map or primitive shapes, there's no need to clear the screen with cls() beforehand.
 * Tip: You can create some interesting effects by not calling cls() or calling it repeatedly it to "flash" the screen when some special event occurs. You can also supply a color index above 15 to see some interesting fill patterns!
 * @param color the index (0 to 15) of the color in the current palette.
 */
declare function cls(color?: number): void

/**
 * Draws a filled circle of the desired radius and color with its center at x, y. It uses the Bresenham algorithm.
 * @param x the x coordinate of the circle center
 * @param y the y coordinate of the circle center
 * @param radius the radius of the circle in pixels
 * @param color the index of the desired color in the current palette
 */
declare function circ(x: number, y: number, radius: number, color: number): void

/**
 * Draws the circumference of a circle with its center at x, y using the radius and color requested. It uses the Bresenham algorithm.
 * @param x the x coordinate of the circle center
 * @param y the y coordinate of the circle center
 * @param radius the radius of the circle in pixels
 * @param color the index of the desired color in the current palette
 */
declare function circb(
  x: number,
  y: number,
  radius: number,
  color: number
): void

/**
 * Draws a filled ellipse of the desired radiuses a b and color with its center at x, y. It uses the Bresenham algorithm.
 * @param x the x coordinate of the ellipse center
 * @param y the y coordinate of the ellipse center
 * @param a the horizontal radius of the ellipse in pixels
 * @param b the vertical radius of the ellipse in pixels
 * @param color the index of the desired color in the current palette
 */
declare function elli(
  x: number,
  y: number,
  a: number,
  b: number,
  color: number
): void

/**
 * Draws an ellipse border with the desired radiuses a b and color with its center at x, y. It uses the Bresenham algorithm.
 * @param x the x coordinate of the ellipse center
 * @param y the y coordinate of the ellipse center
 * @param a the horizontal radius of the ellipse in pixels
 * @param b the vertical radius of the ellipse in pixels
 * @param color the index of the desired color in the current palette
 */
declare function ellib(
  x: number,
  y: number,
  a: number,
  b: number,
  color: number
): void

/**
 * Interrupts program execution and returns to the console when the TIC function ends.
 */
declare function exit(): void

/**
 * Returns true if the specified flag of the sprite is set. See fset for more details.
 * @param spriteId sprite index (0..511)
 * @param flag flag index (0..7) to check
 * @returns true if the specified flag of the sprite is set
 */
declare function fget(spriteId: number, flag: number): boolean

/**
 * Each sprite has eight flags which can be used to store information or signal different conditions. For example, flag 0 might be used to indicate that the sprite is invisible, flag 6 might indicate that the flag should be draw scaled etc.
 * @param spriteId sprite index (0..511)
 * @param flag index of flag (0..7)
 * @param bool state to set (true/false)
 */
declare function fset(spriteId: number, flag: number, bool: boolean): void

/**
 * Will draw text to the screen using the foreground spritesheet as the font. Sprite #256 is used for ASCII code 0, #257 for code 1 and so on. The character 'A' has the ASCII code 65 so will be drawn using the sprite with sprite #321 (256+65).
 * - To simply print text to the screen using the system font, please see print
 * - To print to the console, please see trace
 * @param text any string to be printed to the screen
 * @param x x coordinate where to print the text
 * @param y y coordinate where to print the text
 * @param transcolor the palette index to use for transparency
 * @param charWidth distance between start of each character, in pixels
 * @param charHeight distance vertically between start of each character, in pixels, when printing multi-line text.
 * @param fixed indicates whether the font is fixed width (defaults to false ie variable width)
 * @param scale font scaling (defaults to 1)
 * @returns returns the width of the text in pixels
 */
declare function font(
  text: string,
  x: number,
  y: number,
  transcolor?: number,
  charWidth?: number,
  charHeight?: number,
  fixed?: boolean,
  scale?: number
): number

/**
 * The function returns true if the key denoted by keycode is pressed.
 * If the keycode is omitted, will return true if any key is pressed.
 * @param code the key code we want to check (1..65). Check the wiki for the keycodes.
 * @returns pressed
 */
declare function key(code?: number): boolean

/**
 * Returns true if the given key is pressed but wasn't pressed in the previous frame. Refer to btnp for an explanation of the optional hold and period parameters.
 * If the keycode is omitted, will return true if any key is pressed.
 * @param code the key code we want to check (1..65). See codes in the wiki)
 * @param hold time in ticks before autorepeat
 * @param period time in ticks for autorepeat interval
 * @returns key is pressed (but wasn't pressed in previous frame)
 */
declare function keyp(code?: number, hold?: number, period?: number): boolean

/**
 * Draws a straight line from point (x0,y0) to point (x1,y1) in the specified color.
 * @param x0 the x coordinate of the start of the line
 * @param y0 the y coordinate of the start of the line
 * @param x1 the x coordinate of the end of the line
 * @param y1 the y coordinate of the end of the line
 * @param color the index of the color in the current palette
 */
declare function line(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  color: number
): void

/**
 *
 * @param x The x coordinate of the top left map cell to be drawn (default 0).
 * @param y The y coordinate of the top left map cell to be drawn (default 0).
 * @param w The number of cells to draw horizontally (default 30).
 * @param h The number of cells to draw vertically (default 17).
 * @param sx The screen x coordinate where drawing of the map section will start (default 0).
 * @param sy The screen y coordinate where drawing of the map section will start (default 0).
 * @param colorkey index (or array of indexes 0.80.0) of the color that will be used as transparent color. Not setting this parameter will make the map opaque (default -1).
 * @param scale Map scaling (default 1).
 * @param remap An optional function called before every tile is drawn. Using this callback function you can show or hide tiles, create tile animations or flip/rotate tiles during the map rendering stage: callback [tile [x y] ] -> [tile [flip [rotate] ] ]
 */
declare function map(
  x?: number,
  y?: number,
  w?: number,
  h?: number,
  sx?: number,
  sy?: number,
  colorkey?: number | number[],
  scale?: number,
  remap?: (
    tile: number,
    x: number,
    y: number
  ) => [number, number?, number?] | number | void
): void

/**
 * Copies a continuous block of RAM from one address to another.
 * @param to the address you want to write to
 * @param from the address you want to copy from
 * @param length the length of the memory block you want to copy (in bytes)
 */
declare function memcpy(to: number, from: number, length: number): void

/**
 * Sets a continuous block of RAM to the same value.
 * @param addr the address of the first byte of RAM you want to write to
 * @param value the value you want to write (0..255)
 * @param length the length of the memory block you want to set
 */
declare function memset(addr: number, value: number, length: number): void

/**
 * Returns the tile at the specified MAP coordinates, the top left cell of the map being (0, 0).
 * @param x x coordinate on the map
 * @param y y coordinate on the map
 * @returns the tile id at the given coordinates
 */
declare function mget(x: number, y: number): number

/**
 * Will change the sprite at the specified map coordinates. By default, changes made are only kept while the current game is running. To make permanent changes to the map, see sync.
 * @param x x coordinate on the map
 * @param y y coordinate on the map
 * @param tileId The background sprite (0..255) to place in map at specified coordinates.
 */
declare function mset(x: number, y: number, tileId: number): void

/**
 * Returns the mouse coordinates and a boolean value for the state of each mouse button, with true indicating that a button is pressed.
 * @returns [x, y, left, middle, right, scrollx, scrolly]
 */
declare function mouse(): [
  number,
  number,
  boolean,
  boolean,
  boolean,
  number,
  number
]

/**
 * Starts playing a track created in the Music Editor. Call without arguments to stop the music.
 * @param track the id of the track to play (0..7).
 * @param frame the index of the frame to play from (0..15).
 * @param row the index of the row to play from (0..63).
 * @param loop loop music (true, default) or play it once (false).
 * @param sustain sustain notes after the end of each frame (true) or stop them (false, default).
 * @param tempo play track with the specified tempo.
 * @param speed play track with the specified speed.
 */
declare function music(
  track?: number,
  frame?: number,
  row?: number,
  loop?: boolean,
  sustain?: boolean,
  tempo?: number,
  speed?: number
): void

/**
 * Read directly from RAM. It can be used to access resources created with the integrated tools, such as the sprite, map and sound editors, as well as cartridge data.
 * @param addr the address of RAM you desire to read (segmented based on bits)
 * @param bits the number of bits to read (1, 2, 4, or 8) from address (default: 8)
 * @returns The range of value returned depends on the bits parameter:
 *  - byte : a full byte (0..255) - bits=8
 *  - val4 : a nibble (4 bits) (0..15) - bits=4
 *  - val2 : two bits (0..3) - bits=2
 *  - bitval : a single bit (0..1) - bits=1
 */
declare function peek(addr: number, bits?: 1 | 2 | 4 | 8): number

/**
 * The equivalent of peek(addr, 4)
 * @param addr the address of RAM you desire to read
 * @returns a nibble (4 bits) (0..15)
 */
declare function peek4(addr: number): number

/**
 * The equivalent of peek(addr, 2)
 * @param addr the address of RAM you desire to read
 * @returns two bits (0..3)
 */
declare function peek2(addr: number): number

/**
 * The equivalent of peek(addr, 1)
 * @param addr the address of RAM you desire to read
 * @returns a single bit (0..1)
 */
declare function peek1(addr: number): number

/**
 * Draw a pixel in the specified color
 * @param x x coordinate of the pixel to write
 * @param y y coordinate of the pixel to write
 * @param color the index of the palette color to draw
 */
declare function pix(x: number, y: number, color: number): void

/**
 * Retrieve a pixel's color
 * @param x x coordinate of the pixel to write
 * @param y y coordinate of the pixel to write
 * @returns the index (0..15) of the palette color at the specified coordinates.
 */
declare function pix(x: number, y: number): number

/**
 * Save data to persistent memory. See https://github.com/nesbox/TIC-80/wiki/pmem for more information
 * @param index an index (0..255) into the persistent memory of a cartridge.
 * @param val the value you want to store in the memory.
 */
declare function pmem(index: number, val: number): void

/**
 * Retrieve data from persistent memory. See https://github.com/nesbox/TIC-80/wiki/pmem for more information
 * @param index an index (0..255) into the persistent memory of a cartridge.
 * @returns the current value saved in that memory slot.
 */
declare function pmem(index: number): number

/**
 * Write directly to RAM. The requested number of bits is written at the address requested. The address is typically specified in hexadecimal format.
 * @param addr the address of RAM you desire to write (segmented based on bits)
 * @param val the integer value write to RAM (range varies based on bits)
 * @param bits : the number of bits to write (1, 2, 4, or 8; default: 8)
 */
declare function poke(addr: number, val: number, bits?: 1 | 2 | 3 | 4): void

/**
 * The equivalent of poke(addr, val, 4)
 * @param addr the 4-bit address in RAM to which to write,
 * @param val the 4-bit value (0-15) to write to the specified address
 */
declare function poke4(addr: number, val: number): void

/**
 * The equivalent of poke(addr, val, 2)
 * @param addr the 2-bit address in RAM to which to write,
 * @param val the 2-bit value (0..3) to write to the specified address
 */
declare function poke2(addr: number, val: number): void

/**
 * The equivalent of poke(addr, val, 1)
 * @param addr the bit address address in RAM to which to write,
 * @param val the bit value (0..1) to write to the specified address
 */
declare function poke1(addr: number, val: number): void

/**
 * Prints text to the screen using the font defined in config.
 * - To use a custom rastered font, check out font.
 * - To print to the console, check out trace.
 * @param text any string to be printed to the screen
 * @param x x coordinate where to print the text
 * @param y y coordinate where to print the text
 * @param color the color to use to draw the text to the screen
 * @param fixed a flag indicating whether fixed width printing is required
 * @param scale font scaling
 * @param smallfont use small font if true
 * @returns the width of the text in pixels.
 */
declare function print(
  text: any,
  x?: number,
  y?: number,
  color?: number,
  fixed?: boolean,
  scale?: number,
  smallfont?: boolean
): number

/**
 * Draws a filled rectangle of the desired size and color at the specified position. If you only need to draw the the border or outline of a rectangle (ie not filled) see rectb
 * @param x x coordinate of the top left corner of the rectangle
 * @param y y coordinate of the top left corner of the rectangle
 * @param w the width the rectangle in pixels
 * @param h the height of the rectangle in pixels
 * @param color the index of the color in the palette that will be used to fill the rectangle
 */
declare function rect(
  x: number,
  y: number,
  w: number,
  h: number,
  color: number
): void

/**
 * Draws a one pixel thick rectangle border at the position requested. If you need to fill the rectangle with a color see rect instead.
 * @param x x coordinate of the top left corner of the rectangle
 * @param y y coordinate of the top left corner of the rectangle
 * @param w the width the rectangle in pixels
 * @param h the height of the rectangle in pixels
 * @param color the index of the color in the palette that will be used to color the rectangle's border.
 */
declare function rectb(
  x: number,
  y: number,
  w: number,
  h: number,
  color: number
): void

/**
 * Resets the cartridge. To return to the console, see the exit function.
 */
declare function reset(): void

/**
 * Will play the sound with id created in the sfx editor.
 *  To stop playing: `sfx(-1)` or `sfx(-1, null, null, channel)`
 * @param id the SFX id (0..63), or -1 to stop playing
 * @param note the note number (0..95) or name (ex: C#3)
 * @param duration the duration (number of frames) (-1 by default, which plays continuously)
 * @param channel the audio channel to use (0..3)
 * @param volume the volume (0..15) (defaults to 15)
 * @param speed the speed (-4..3) (defaults to 0)
 */
declare function sfx(
  id: number,
  note?: number | string,
  duration?: number,
  channel?: number,
  volume?: number,
  speed?: number
): void

/**
 * Draws the sprite number index at the x and y coordinate.
 * You can specify a colorkey in the palette which will be used as the transparent color or use a value of -1 for an opaque sprite.
 * The sprite can be scaled up by a desired factor. For example, a scale factor of 2 means an 8x8 pixel sprite is drawn to a 16x16 area of the screen.
 * You can flip the sprite where:
 * - 0 = No Flip
 * - 1 = Flip horizontally
 * - 2 = Flip vertically
 * - 3 = Flip both vertically and horizontally
 *
 * When you rotate the sprite, it's rotated clockwise in 90° steps:
 * - 0 = No rotation
 * - 1 = 90° rotation
 * - 2 = 180° rotation
 * - 3 = 270° rotation
 *
 * You can draw a composite sprite (consisting of a rectangular region of sprites from the sprite sheet) by specifying the w and h parameters (which default to 1).
 * @param id index of the sprite
 * @param x x coordinate where the sprite will be drawn, starting from top left corner.
 * @param y y coordinate where the sprite will be drawn, starting from top left corner.
 * @param colorkey index (or array of indexes) of the color in the sprite that will be used as transparent color. Use -1 if you want an opaque sprite.
 * @param scale scale factor applied to sprite.
 * @param flip flip the sprite horizontally (1), vertically (2) or both (3).
 * @param rotate rotate the sprite by 0, 90 (1), 180 (2) or 270 (3) degrees.
 * @param w width of composite sprite
 * @param h height of composite sprite
 */
declare function spr(
  id: number,
  x: number,
  y: number,
  colorkey?: number | number[],
  scale?: number,
  flip?: 0 | 1 | 2 | 3,
  rotate?: 0 | 1 | 2 | 3,
  w?: number,
  h?: number
): void

/**
 * The pro version of TIC-80 contains 8 memory banks. To switch between these banks, sync can be used to either load contents from a memory bank to runtime, or save contents from the active runtime to a bank. The function can only be called once per frame.
 * If you have manipulated the runtime memory (e.g. by using mset), you can reset the active state by calling sync(0,0,false). This resets the whole runtime memory to the contents of bank 0.
 * Note that sync is not used to load code from banks; this is done automatically.
 * @param mask mask of sections you want to switch:
 * - tiles   = 1<<0 -- 1
 * - sprites = 1<<1 -- 2
 * - map     = 1<<2 -- 4
 * - sfx     = 1<<3 -- 8
 * - music   = 1<<4 -- 16
 * - palette = 1<<5 -- 32
 * - flags   = 1<<6 -- 64
 * - screen  = 1<<7 -- 128
 * @param bank memory bank, can be 0..7.
 * @param tocart true - save sprites/map/sound from runtime to bank, false - load data from bank to runtime.
 */
declare function sync(mask?: number, bank?: number, tocart?: boolean): void

/**
 * This function draws a triangle filled with texture from either SPRITES or MAP RAM or VBANK.
 * @param x1 the screen coordinates of the first corner
 * @param y1 the screen coordinates of the first corner
 * @param x2 the screen coordinates of the second corner
 * @param y2 the screen coordinates of the second corner
 * @param x3 the screen coordinates of the third corner
 * @param y3 the screen coordinates of the third corner
 * @param u1 the UV coordinates of the first corner
 * @param v1 the UV coordinates of the first corner
 * @param u2 the UV coordinates of the second corner
 * @param v2 the UV coordinates of the second corner
 * @param u3 the UV coordinates of the third corner
 * @param v3 the UV coordinates of the third corner
 * @param useMap if false (default), the triangle's texture is read from SPRITES RAM. If true, the texture comes from the MAP RAM.
 * @param trans index (or array of indexes 0.80) of the color(s) that will be used as transparent
 * @param z1 depth parameters for texture correction
 * @param z2 depth parameters for texture correction
 * @param z3 depth parameters for texture correction
 */
declare function ttri(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  u1: number,
  v1: number,
  u2: number,
  v2: number,
  u3: number,
  v3: number,
  useMap?: boolean,
  trans?: number,
  z1?: number,
  z2?: number,
  z3?: number
): void

/**
 * Returns the number of milliseconds elapsed since the cartridge began execution. Useful for keeping track of time, animating items and triggering events.
 * @returns the number of milliseconds elapsed since the application began.
 */
declare function time(): number

/**
 * Returns the number of seconds elapsed since January 1st, 1970. Useful for creating persistent games which evolve over time between plays.
 * @returns the current Unix timestamp in seconds
 */
declare function tstamp(): number

/**
 * This is a service function, useful for debugging your code. It prints the message parameter to the console in the (optional) color specified.
 * @param msg the message to print in the console. Can be a 'string' or variable.
 * @param color the index of a color in the current palette (0..15)
 */
declare function trace(msg: any, color?: number): void

/**
 * Draws a triangle filled with color, using the supplied vertices.
 * @param x1 the x coordinate of the first triangle corner
 * @param y1 the y coordinate of the first triangle corner
 * @param x2 the x coordinate of the second triangle corner
 * @param y2 the y coordinate of the second triangle corner
 * @param x3 the x coordinate of the third triangle corner
 * @param y3 the y coordinate of the third triangle corner
 * @param color the index of the desired color in the current palette
 */
declare function tri(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  color: number
): void

/**
 * This function draws a triangle border with color, using the supplied vertices.
 * @param x1 the x coordinate of the first triangle corner
 * @param y1 the y coordinate of the first triangle corner
 * @param x2 the x coordinate of the second triangle corner
 * @param y2 the y coordinate of the second triangle corner
 * @param x3 the x coordinate of the third triangle corner
 * @param y3 the y coordinate of the third triangle corner
 * @param color the index of the desired color in the current palette
 */
declare function trib(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  color: number
): void

/**
 * @deprecated Use ttri() instead.
 */
declare function textri(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  u1: number,
  v1: number,
  u2: number,
  v2: number,
  u3: number,
  v3: number,
  useMap?: boolean,
  trans?: number | number[]
): void

/**
 * Switch the VRAM bank. More information: https://github.com/nesbox/TIC-80/wiki/vbank
 *
 * @param bank the vram bank id to switch to
 */
declare function vbank(bank: 0 | 1): void
