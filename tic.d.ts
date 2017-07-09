declare function btn(id: number): void;

declare function btnp(id: number, hold?: number, period?: number): void;

declare function clip(x: number, y: number, w: number, h: number): void;

declare function cls(color: number): void;

declare function circ(x: number, y: number, r: number, color: number): void;

declare function circb(x: number, y: number, r: number, color: number): void;

// declare function font(): any;

declare function line(x0: number, y0: number, x1: number, y1: number, color: number): void;

declare type cbRemap = (tile: number) => void;

declare function map(x?: number, y?: number, w?: number, h?: number, sx?: number, sy?: number, colorkey?: number, scale?: number, remap?: cbRemap): void;

declare function memcpy(toaddr: number, fromaddr: number, len: number): void;

declare function memset(addr: number, val: number, len: number): void;

declare function mget(x: number, y: number): number;

declare function mouse(): number[];

declare function mset(x: number, y: number, id: number): void;

declare function music(track?: number, frame?: number, loop?: boolean): void;

declare function peek(addr: number): number;

// declare function peek4(): any;

declare function pix(x: number, y: number, color?: number): number;

declare function pmem(index: number, val?: number): number | void;

declare function poke(addr: number, val: number): void;

// declare function poke4(): any;

declare function print(str: string, x: number, y: number): void;

declare function rect(x: number, y: number, w: number, h: number, color: number);

declare function rectb(x: number, y: number, w: number, h: number, color: number);

declare function sfx(id: number, note?: number | string, duration?: number, channel?: number, volume?: number, speed?: number);

declare function spr(id: number, x: number, y: number, colorkey?: number, scale?: number, flip?: number, rotate?: number, w?: number, h?: number);

declare function sync();

declare function time(): number;

declare function trace(msg: any, color?: number): void;

declare function tri(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number);