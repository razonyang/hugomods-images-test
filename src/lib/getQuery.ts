
export function getQueryParams<T extends Record<string, string> = Record<string, string>>() {
  const params = new URLSearchParams(window.location.search);
  const parameters = Object.fromEntries(params);

  return parameters as T;
}