export const buildEndpoint = (
  endpoint: string,
  params: Record<string, string | number>,
) => {
  let url = endpoint;
  Object.keys(params).forEach((key) => {
    url = url.replace(`:${key}`, params[key].toString());
  });
  return url;
};
