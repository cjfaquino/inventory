import { IItem } from '../models/Item';

export default (
  array: IItem[],
  totalValue: boolean = false,
  locale: string = 'en-us'
) => {
  const totalVal = array.reduce((total: number, obj: IItem) => {
    if (totalValue) {
      return obj.price * obj.stock + total;
    }
    return obj.price + total;
  }, 0);
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
  }).format(totalVal);

  return formatted;
};
