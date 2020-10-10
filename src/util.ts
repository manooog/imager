export const praseUri = (uri: string, options?: { [key: string]: string }) => {
  let matcher = uri.match(/\:[a-zA-Z]+/g);

  if (!options) return uri;

  if (matcher.length > 0) {
    matcher.forEach((m) => {
      uri = uri.replace(m, options[m.slice(1)] || m);
    });
  }
  return uri;
};
