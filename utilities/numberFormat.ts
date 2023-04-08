export default (number: number | string, locale: string = 'en-us') => {
  if (Number.isNaN(number)) return '';

  const formatted = new Intl.NumberFormat(locale).format(number as number);

  return formatted;
};
