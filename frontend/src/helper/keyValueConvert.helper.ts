export const KeyValueConverter = (list: any[]) => {
  const _data = [];
  for (const key of list) {
    _data.push({ value: key, label: key });
  }
  return _data;
};
