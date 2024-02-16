export function printh(msg: any, color?: number): void {
  if (typeof msg === "string") trace(msg, color)
  else trace(JSON.stringify(msg, null, 1), color)
}
