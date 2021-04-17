export function isError(input: any) {
  return input instanceof Error || toString.call(input) === '[object Error]';
}