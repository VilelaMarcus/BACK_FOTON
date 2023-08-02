const getBase64Size = (value: string) => {
  const stringLength = value.length - 'data:image/png;base64,'.length;
  return 4 * Math.ceil(stringLength / 3) * 0.562_489_633_438_381_2;
};

export { getBase64Size };
