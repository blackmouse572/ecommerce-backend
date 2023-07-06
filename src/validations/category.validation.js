const Joi = require('joi');

const createCategory = {
  body: Joi.object().keys({
    title: Joi.string().required(),
  }),
};

const getCategories = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    slug: Joi.string(),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    slug: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
    })
    .min(1),
};

const deleteCategory = {
  params: Joi.object().keys({
    slug: Joi.string(),
  }),
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
