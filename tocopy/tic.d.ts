/** @noSelfInFile */

/**
 * Allows you to read the status of one of the buttons attached to TIC. The function returns true if the key with the supplied id is currently in the pressed state. It remains true for as long as the key is held down. If you want to test if a key was just pressed, use btnp instead,
 * @param id the id of the key we want to interrogate, see the key map for reference
 * @returns pressed
 */
declare function btn(id: number): boolean;

/**
 * Allows you to read the status of one of TIC's buttons. It returns true only if the key has been pressed since the last frame.
 * You can also use the optional hold and period parameters which allow you to check if a button is being held down. After the time specified by hold has elapsed, btnp will return true each time period is passed if the key is still down. For example, to re-examine the state of button '0' after 2 seconds and continue to check its state every 1/10th of a second, you would use btnp(0, 120, 6). Since time is expressed in ticks and TIC runs at 60 frames per second, we use the value of 120 to wait 2 seconds and 6 ticks (ie 60/10) as the interval for re-checking.
 * @param id The id of the key we wish to interrogate - see the key map for reference
 * @param [hold] The time (in ticks) the key must be pressed before re-checking
 * @param [period] The the amount of time (in ticks) after hold before this function will return true again.
 * @returns pressed (but wasn't pressed in previous frame)
 */
declare function btnp(id: number, hold?: number, period?: number): boolean;

/**
 * Limits drawing to a clipping region or 'viewport' defined by x,y,w,h. Things drawn outside of this area will not be visible.
 * Calling clip() with no parameters will reset the drawing area to the entire screen.
 */
declare function clip(): void;

/**
 * Limits drawing to a clipping region or 'viewport' defined by x,y,w,h. Things drawn outside of this area will not be visible.
 * Calling clip() with no parameters will reset the drawing area to the entire screen.
 * @param x x coordinate of the top left of the clipping region
 * @param y y coordinate of the top left of the clipping region
 * @param w width of the drawing area in pixels
 * @param h height of the drawing area in pixels
 */
declare function clip(x: number, y: number, w: number, h: number): void;

/**
 * Clears the entire screen using the color argument. If no parameter is passed, index 0 of the palette is used.
 * The function is usually called inside TIC(), but isn't mandatory. If you're drawing to the entire screen, for example with sprites, the map or primitive shapes, there's no need to clear the screen with cls() beforehand.
 * Tip: You can create some interesting effects by not calling cls() or calling it repeatedly it to "flash" the screen when some special event occurs. You can also supply a color index above 15 to see some interesting fill patterns!
 * @param color the index (0 to 15) of the color in the current palette.
 */
declare function cls(color: number): void;

/**
 * Draws a filled circle of the desired radius and color with its center at x, y. It uses the Bresenham algorithm.
 * @param x the x coordinate of the circle center
 * @param y the y coordinate of the circle center
 * @param r the radius of the circle in pixels
 * @param color the index of the desired color in the current palette
 */
declare function circ(x: number, y: number, r: number, color: number): void;

/**
 * Draws the circumference of a circle with its center at x, y using the radius and color requested. It uses the Bresenham algorithm.
 * @param x the x coordinate of the circle center
 * @param y the y coordinate of the circle center
 * @param r the radius of the circle in pixels
 * @param color the index of the desired color in the current palette
 */
declare function circb(x: number, y: number, r: number, color: number): void;

/**
 * Draws a filled ellipse of the desired radiuses a b and color with its center at x, y. It uses the Bresenham algorithm.
 * @param x the x coordinate of the ellipse center
 * @param y the y coordinate of the ellipse center
 * @param a the horizontal radius of the ellipse in pixels
 * @param b the vertical radius of the ellipse in pixels
 * @param color the index of the desired color in the current palette
 */
declare function elli(x: number, y: number, a: number, b: number, color: number): void;

/**
 * Draws an ellipse border with the desired radiuses a b and color with its center at x, y. It uses the Bresenham algorithm.
 * @param x the x coordinate of the ellipse center
 * @param y the y coordinate of the ellipse center
 * @param a the horizontal radius of the ellipse in pixels
 * @param b the vertical radius of the ellipse in pixels
 * @param color the index of the desired color in the current palette
 */
declare function ellib(x: number, y: number, a: number, b: number, color: number): void;


/**
 * Interrupts program execution and returns to the console when the TIC function ends.
 */
declare function exit(): void;

/**
 * Returns true if the specified flag of the sprite is set. See fset for more details.
 * @param index sprite index
 * @param flag flag index (0-7) to check
 * @returns true if the specified flag of the sprite is set
 */
declare function fget(index: number, flag: number): boolean;

/**
 * Will draw text to the screen using sprites from the foreground sprite-sheet for the font. More specifically, sprite ID#256 is used for ASCII code 0, #257 for code 1 and so on. The character 'A' has the ASCII code 65 so will be drawn using the sprite with ID#321 (256+65). See the example below or check out the In-Browser Demo
 * - To simply print text to the screen using the default font, see print.
 * - To print to the console, refer to trace
 * @param text any string to be printed to the screen
 * @param x x coordinate where to print the text
 * @param y y coordinate where to print the text
 * @param colorkey the colorkey to use as transparency.
 * @param w Width of characters to use for spacing, in pixels
 * @param h Height of characters to use for multiple line spacing, in pixels.
 * @param fixed a flag indicating whether to fix the width of the characters, by default is not fixed
 * @param scale font scaling
 * @returns returns the width of the text in pixels.
 */
declare function font(text: string, x?: number, y?: number, colorkey?: number, w?: number, h?: number, fixed?: boolean, scale?: number): number;

/**
 * Each sprite has eight flags which can be used to store information or signal different conditions. For example, flag 0 might be used to indicate that the sprite is invisible, flag 6 might indicate that the flag should be draw scaled etc.
 * @param index sprite index
 * @param flag index of flag (0-7)
 * @param bool What state to set the flag, true or false
 */
declare function fset(index: number, flag: number, bool: boolean): void;

/**
 * The function returns true if the key denoted by keycode is pressed.
 * @param code the key code we want to check (check the wiki for the keycodes)
 * @returns pressed
 */
declare function key(code: number): boolean

/**
 * Returns true if the given key is pressed but wasn't pressed in the previous frame. Refer to btnp for an explanation of the optional hold and period parameters
 * @param code the key code we want to check (see codes in the wiki)
 * @param hold time in ticks before autorepeat
 * @param period time in ticks for autorepeat interval
 * @returns pressed (but wasn't pressed in previous frame)
 */
declare function keyp(code: number, hold: number, period: number): boolean

/**
 * Draws a straight line from point (x0,y0) to point (x1,y1) in the specified color.
 * @param x0 the x coordinate where the line starts
 * @param y0 the y coordinate where the line starts
 * @param x1 the x coordinate where the line ends
 * @param y1 the y coordinate where the line ends
 * @param color the index of the color in the current palette
 */
declare function line(x0: number, y0: number, x1: number, y1: number, color: number): void;

/**
 *
 * @param x The leftmost map cell to be drawn.
 * @param y The uppermost map cell to be drawn.
 * @param w The number of cells to draw horizontally.
 * @param h The number of cells to draw vertically.
 * @param sx The screen x coordinate where drawing of the map section will start.
 * @param sy The screen y coordinate where drawing of the map section will start.
 * @param colorkey index (or array of indexes 0.80.0) of the color that will be used as transparent color. Not setting this parameter will make the map opaque.
 * @param scale Map scaling.
 * @param remap An optional function called before every tile is drawn. Using this callback function you can show or hide tiles, create tile animations or flip/rotate tiles during the map rendering stage: callback [tile [x y] ] -> [tile [flip [rotate] ] ]
 */
declare function map(x?: number, y?: number, w?: number, h?: number, sx?: number, sy?: number, colorkey?: number, scale?: number, remap?: (tile: number, x: number, y: number) => [number, number, number]): void;

/**
 * Allows you to copy a continuous block of TIC's 64k RAM from one address to another. Addresses are specified are in hexadecimal format, values are decimal.
 * @param toaddr the address you want to write to
 * @param fromaddr the address you want to copy from
 * @param len the length of the memory block you want to copy
 */
declare function memcpy(toaddr: number, fromaddr: number, len: number): void;

/**
 * Allows you to set a continuous block of any part of TIC's RAM to the same value. The address is specified in hexadecimal format, the value in decimal.
 * @param addr the address of the first byte of 64k RAM you want to write to
 * @param val the value you want to write
 * @param len the length of the memory block you want to set
 */
declare function memset(addr: number, val: number, len: number): void;

/**
 * Returns the sprite id at the given x and y map coordinate
 * @param x x coordinate on the map
 * @param y y coordinate on the map
 * @returns the sprite id at the given x and y map coordinate
 */
declare function mget(x: number, y: number): number;

/**
 * Returns the mouse coordinates and a boolean value for the state of each mouse button, with true indicating that a button is pressed.
 * @returns [x, y, left, middle, right, scrollx, scrolly]
 */
declare function mouse(): [number, number, boolean, boolean, boolean, number, number];

/**
 * Will change the sprite at the specified map coordinates. By default, changes made are only kept while the current game is running. To make permanent changes to the map, see sync.
 * @param x x coordinate on the map
 * @param y y coordinate on the map
 * @param id The background sprite (0-255) to place in map at specified coordinates.
 */
declare function mset(x: number, y: number, id: number): void;

/**
 * Starts playing a track created in the Music Editor. Call without arguments to stop the music.
 * @param track the id of the track to play from (0..7)
 * @param frame the index of the frame to play from (0..15)
 * @param row the index of the row to play from (0..63)
 * @param loop oop music or play it once (true/false)
 * @param sustain ustain notes after the end of each frame or stop them (true/false)
 */
declare function music(track?: number, frame?: number, row?: number, loop?: boolean, sustain?: boolean): void;

/**
 * Allow to read the memory from TIC.
 * It's useful to access resources created with the integrated tools like sprite, maps, sounds, cartridges data? Never dream to sound a sprite?
 * Address are in hexadecimal format but values are decimal.
 * To write to a memory address, use poke.
 * @param addr any address of the 80k RAM byte you want to read
 * @returns the value read from the addr parameter. Each address stores a byte, so the value will be an integer from 0 to 255.
 */
declare function peek(addr: number): number;

/**
 * Enables you to read values from TIC's RAM. The address should be specified in hexadecimal format.
 * @param addr any address of the 80K RAM byte you want to read, divided in groups of 4 bits (nibbles). Therefore, to address the high nibble of position 0x2000 you should pass 0x4000 as addr4, and to access the low nibble (rightmost 4 bits) you would pass 0x4001.
 * @returns the 4-bit value (0-15) read from the specified address.
 */
declare function peek4(addr: number): number;

/**
 * Can read or write pixel color values. When called with a color parameter, the pixel at the specified coordinates is set to that color. Calling the function without a color parameter returns the color of the pixel at the specified position.
 * @param x x coordinate of the pixel to write
 * @param y y coordinate of the pixel to write
 * @param color the index of the color in the palette to apply at the desired coordinates
 * @returns returns the index (0-15) in the color palette at the specified x and y coordinates.
 */
declare function pix(x: number, y: number, color?: number): number;

/**
 * Allows you to save and retrieve data in one of the 256 individual 32-bit slots available in the cartridge's persistent memory. This is useful for saving high-scores, level advancement or achievements. The data is stored as unsigned 32-bit integers (from 0 to 4294967295).
 * - pmem depends on the cartridge hash (md5), so don't change your lua script if you want to keep the data.
 * - Use saveid: with a personalized string in the header metadata to override the default MD5 calculation. This allows the user to update a cart without losing their saved data.
 * @param index the index of the value you want to save/read in the persistent memory
 * @param val the value you want to store in the memory. Omit this parameter if you want to read the memory.
 */
declare function pmem(index: number, val: number): void;

/**
 * Allows you to save and retrieve data in one of the 256 individual 32-bit slots available in the cartridge's persistent memory. This is useful for saving high-scores, level advancement or achievements. The data is stored as unsigned 32-bit integers (from 0 to 4294967295).
 * - pmem depends on the cartridge hash (md5), so don't change your lua script if you want to keep the data.
 * - Use saveid: with a personalized string in the header metadata to override the default MD5 calculation. This allows the user to update a cart without losing their saved data.
 * @param index the index of the value you want to save/read in the persistent memory
 * @returns when function is call with only index parameters it'll return the value saved in that memory slot.
 */
declare function pmem(index: number): number;

/**
 * Allows you to write a single byte to any address in TIC's RAM. The address should be specified in hexadecimal format, the value in decimal.
 * @param addr the address in RAM
 * @param val the value to write
 */
declare function poke(addr: number, val: number): void;

/**
 * Allows you to write to the virtual RAM of TIC. It differs from poke in that it divides memory in groups of 4 bits. Therefore, to address the high nibble of position 0x4000 you should pass 0x8000 as addr4, and to access the low nibble (rightmost 4 bits) you would pass 0x8001. The address should be specified in hexadecimal format, and values should be given in decimal.
 * @param addr the nibble (4 bits) address in RAM to which to write,
 * @param val the 4-bit value (0-15) to write to the specified address
 */
declare function poke4(addr: number, val: number): void;

/**
 * This will simply print text to the screen using the font defined in config. When set to true, the fixed width option ensures that each character will be printed in a 'box' of the same size, so the character 'i' will occupy the same width as the character 'w' for example. When fixed width is false, there will be a single space between each character.
 * - To use a custom rastered font, check out font.
 * - To print to the console, check out trace.
 * @param str any string to be printed to the screen
 * @param x x coordinate where to print the text
 * @param y y coordinate where to print the text
 * @param color the color to use to draw the text to the screen
 * @param fixed a flag indicating whether fixed width printing is required
 * @param scale font scaling
 * @param smallfont use small font if true
 * @returns returns the width of the text in pixels.
 */
declare function print(str: any, x?: number, y?: number, color?: number, fixed?: boolean, scale?: number, smallfont?: boolean): number;

/**
 * Draws a filled rectangle of the desired size and color at the specified position. If you only need to draw the the border or outline of a rectangle (ie not filled) see rectb
 * @param x x coordinate of the top left corner of the rectangle
 * @param y y coordinate of the top left corner of the rectangle
 * @param w the width the rectangle in pixels
 * @param h the height of the rectangle in pixels
 * @param color the index of the color in the palette that will be used to fill the rectangle
 */
declare function rect(x: number, y: number, w: number, h: number, color: number): void;

/**
 * Draws a one pixel thick rectangle border at the position requested. If you need to fill the rectangle with a color see rect instead.
 * @param x x coordinate of the top left corner of the rectangle
 * @param y y coordinate of the top left corner of the rectangle
 * @param w the width the rectangle in pixels
 * @param h the height of the rectangle in pixels
 * @param color the index of the color in the palette that will be used to fill the rectangle
 */
declare function rectb(x: number, y: number, w: number, h: number, color: number): void;

/**
 * Resets the cartridge. To return to the console, see the exit function.
 */
declare function reset(): void

/**
 * Will play the sound with id created in the sfx editor. Calling the function with id set to -1 will stop playing the channel.
 * The note can be supplied as an integer between 0 and 95 (representing 8 octaves of 12 notes each) or as a string giving the note name and octave. For example, a note value of '14' will play the note 'D' in the second octave. The same note could be specified by the string 'D-2'. Note names consist of two characters, the note itself (in upper case) followed by '-' to represent the natural note or '#' to represent a sharp. There is no option to indicate flat values. The available note names are therefore: C-, C#, D-, D#, E-, F-, F#, G-, G#, A-, A#, B-. The octave is specified using a single digit in the range 0 to 8.
 * The duration specifies how many ticks to play the sound for; since TIC-80 runs at 60 frames per second, a value of 30 represents half a second. A value of -1 will play the sound continuously.
 * The channel parameter indicates which of the four channels to use. Allowed values are 0 to 3.
 * Volume can be between 0 and 15.
 * Speed in the range -4 to 3 can be specified and means how many 'ticks+1' to play each step, so speed==0 means 1 tick per step.
 * @param id The sfx id, from 0 to 63
 * @param note The note number or name
 * @param duration Duration (-1 by default)
 * @param channel Which channel to use, 0..3
 * @param volume Volume (15 by default)
 * @param speed Speed (0 by default)
 */
declare function sfx(id: number, note?: number | string, duration?: number, channel?: number, volume?: number, speed?: number): void;

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
declare function spr(id: number, x: number, y: number, colorkey?: number, scale?: number, flip?: 0 | 1 | 2 | 3, rotate?: 0 | 1 | 2 | 3, w?: number, h?: number): void;

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
 * @param bank memory bank, can be 0...7.
 * @param tocart true - save sprites/map/sound from runtime to bank, false - load data from bank to runtime.
 */
declare function sync(mask?: number, bank?: number, tocart?: boolean): void;

/**
 * Returns the number of milliseconds elapsed since the cartridge began execution. Useful for keeping track of time, animating items and triggering events.
 * @returns the number of milliseconds elapsed since the application began.
 */
declare function time(): number;

/**
 * Returns the number of seconds elapsed since January 1st, 1970. Useful for creating persistent games which evolve over time between plays.
 * @returns the number of seconds that have passed since January 1st, 1970.
 */
declare function tstamp(): number;

/**
 * This is a service function, useful for debugging your code. It prints the message parameter to the console in the (optional) color specified.
 * @param msg the message to print in the console. Can be a 'string' or variable.
 * @param color color for the msg text
 */
declare function trace(msg: any, color?: number): void;

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
declare function tri(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number): void;

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
 declare function trib(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number): void;

/**
 * It renders a triangle filled with texture from image ram or map ram
 *
 * UV Coordinates
 * These can be thought of as the window inside image ram (sprite sheet), or map ram. Note that the sprite sheet or map in this case is treated as a single large image, with U and V addressing its pixels directly, rather than by sprite ID. So for example the top left corner of sprite #2 would be located at u=16, v=0.
 *
 * Use in 3D graphics
 * This function does not perform perspective correction, so it is not generally suitable for 3D graphics (except in some constrained scenarios). In particular, if the vertices in the triangle have different 3D depth, you may see some distortion.
 *
 * @param x1 the x coordinate of the first triangle corner
 * @param y1 the y coordinate of the first triangle corner
 * @param x2 the x coordinate of the second triangle corner
 * @param y2 the y coordinate of the second triangle corner
 * @param x3 the x coordinate of the third triangle corner
 * @param y3 the y coordinate of the third triangle corner
 * @param u1 the U coordinate of the first triangle corner
 * @param v1 the V coordinate of the first triangle corner
 * @param u2 the U coordinate of the second triangle corner
 * @param v2 the V coordinate of the second triangle corner
 * @param u3 the U coordinate of the third triangle corner
 * @param v3 the V coordinate of the third triangle corner
 * @param use_map if false (default), the triangle's texture is read from the image vram (sprite sheet). If true, the texture comes from the map ram.
 * @param colorkey index (or array of indexes 0.80.0) of the color that will be used as transparent color.
 */
declare function textri(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, u1: number, v1: number, u2: number, v2: number, u3: number, v3: number, use_map?: boolean, colorkey?: number | number[]): void;
