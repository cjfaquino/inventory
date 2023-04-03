import { Schema } from 'mongoose';

const Item = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

// virtual for Item's URL
Item.virtual('url').get(function () {
  return `/catalog/${this._id}`;
});

export default Item;
