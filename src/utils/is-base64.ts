const base64regex =
  /^([\d+/A-Za-z]{4})*(([\d+/A-Za-z]{2}==)|([\d+/A-Za-z]{3}=))?$/;

export const isBase64 = (value: string) => base64regex.test(value);
