import { Schema, Types, model } from 'mongoose';

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
  return `/catalog/${this._id}`;
});

export default model<IItem>('Item', ItemSchema);
