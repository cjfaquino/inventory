import { Schema, Types, model } from 'mongoose';
import currencyFormat from '../utilities/currencyFormat';

export interface IItem {
  name: string;
  description: string;
  category: Types.ObjectId;
  price: number;
  stock: number;
}

const ItemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

// virtual for Item's URL
ItemSchema.virtual('url').get(function () {
  return `/product/${this._id}`;
});

// virtual for Item's price formatted
ItemSchema.virtual('price_formatted').get(function () {
  return currencyFormat([this]);
});

// virtual for Item's total value
ItemSchema.virtual('totalVal').get(function () {
  return currencyFormat([this], true);
});

export default model<IItem>('Item', ItemSchema);
