import { Schema } from 'mongoose';

const Category = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// virtual for Category's URL
Category.virtual('url').get(function () {
  return `/catalog/${this.name}`;
});

export default Category;
