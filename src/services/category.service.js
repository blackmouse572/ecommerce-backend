const httpStatus = require('http-status');
const { Category } = require('../models');
const toSlug = require('../utils/slug');
const ApiError = require('../utils/ApiError');

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Category>}
 */
const createCategory = async (categoryBody) => {
  if (await Category.isTitleTaken(categoryBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
  }

  return Category.create({ ...categoryBody, slug: toSlug(categoryBody.title) });
};

/**
 * Query for categories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCategories = async (filter, options) => {
  const categories = await Category.paginate(filter, options);
  return categories;
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategoryById = async (id) => {
  return Category.findById(id);
};

/**
 * Get category by slug
 * @param {string} slug
 * @returns {Promise<Category>}
 */
const getCategoryBySlug = async (slug) => {
  return Category.findOne({ slug });
};

/**
 * Update category by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<Category>}
 */
const updateCategoryById = async (categoryId, updateBody) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  if (updateBody.title && (await Category.isTitleTaken(updateBody.title, categoryId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Update category by slug
 * @param {ObjectId} slug
 * @param {Object} updateBody
 * @returns {Promise<Category>}
 */
const updateCategoryBySlug = async (slug, updateBody) => {
  const category = await getCategoryBySlug(slug);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  if (updateBody.title && (await Category.isTitleTaken(updateBody.title, slug))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await category.remove();
  return category;
};

/**
 * Delete category by slug
 * @param {ObjectId} slug
 * @returns {Promise<Category>}
 */
const deleteCategoryBySlug = async (slug) => {
  const category = await getCategoryBySlug(slug);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await category.remove();
  return category;
};

module.exports = {
  createCategory,
  queryCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getCategoryBySlug,
  updateCategoryBySlug,
  deleteCategoryBySlug,
};
