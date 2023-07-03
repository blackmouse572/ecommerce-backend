const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const slug = require('../utils/slug');

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} title - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
categorySchema.statics.isTitleTaken = async function (title, excludeUserId) {
  const category = await this.findOne({ title, _id: { $ne: excludeUserId } });
  return !!category;
};

categorySchema.pre('save', async function (next) {
  const category = this;
  if (category.isModified('title')) {
    category.slug = slug(category.title);
  }
  next();
});

/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
