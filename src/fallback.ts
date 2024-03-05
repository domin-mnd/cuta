export let fall = Object.assign({}, console);

export function init(console: Console) {
  fall = Object.assign({}, console);
}

export function fallback(
  functionToFallback: (...data: any[]) => any,
  data: any[],
): boolean {
  /**
   * Getting path of the caller
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack#description Error.prototype.stack}
   */
  const stackPaths = new Error().stack?.split("\n");
  while (stackPaths?.[0].includes("cuta/dist/index.mjs"))
    stackPaths?.splice(0, 1);

  // If one of paths include "node_modules" then it should fallback because it is probably a package that runs console.log or functions similar
  const shouldFallback = stackPaths?.some((value) =>
    value.includes("node_modules"),
  );
  if (shouldFallback) functionToFallback(...data);

  return shouldFallback ?? false;
}

export function Fallback(
  _target: any,
  name: string,
  descriptor: PropertyDescriptor,
) {
  const method = descriptor.value;
  descriptor.value = function (...args: any) {
    if (fallback(fall[name as keyof Console] as any, args)) return;
    method.apply(this, args);
  };
}
