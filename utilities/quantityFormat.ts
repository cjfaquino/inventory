import { IItem } from '../models/Item';

export default (array: IItem[], locale: string = 'en-us') => {
  const totalVal = array.reduce(
    (total: number, obj: IItem) => obj.stock + total,
    0
  );
  const formatted = new Intl.NumberFormat(locale).format(totalVal);

  return formatted;
};
