import { fall } from ".";

export function fallback(
  functionToFallback: (...data: any[]) => any,
  data: any[]
): boolean {
  /**
   * Getting path of the caller
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack#description Error.prototype.stack}
   */
  const stackPath = new Error().stack?.split("\n")[3].trim();

  // If the path includes "node_modules" then we should fallback because it is probably a package that runs console.log or functions similar
  const shouldFallback = stackPath?.includes("node_modules") ?? false;
  if (shouldFallback) functionToFallback(...data);

  return shouldFallback;
}

export function Fallback(
  _target: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  descriptor.value = function (...args: any) {
    if (fallback(fall[name as keyof Console] as any, args)) return;
    method.apply(this, args);
  };
}
