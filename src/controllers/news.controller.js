"use strict";

import sequelize from 'sequelize';
import { Entry, Category } from "../models";
import { paginate, responses } from "../helpers";
import { Joi } from 'express-validation';
import { formatValidationErrors } from '../helpers';

const validationSchema = Joi.object({
  name: Joi.string().max(255).required(),
  categoryId: Joi.number().integer(),
  type: Joi.string().max(255),
  image: Joi.string().max(255),
  content: Joi.string().required(),
}).unknown().options({ abortEarly: false });

/**
 * Returns an instance of the Entry given by the 'id' param or an error object if not found.
 */
export const retrieve = async (req, res) => {
  const entryId = req.params.id;

  try {
    const instance = await Entry.findOne({
      where: {
        id: entryId
      },
      attributes: {
        include: [[sequelize.col("category.name"), "categoryName"]]
      },
      include: [
        {
          model: Category,
          required: false,
          as: 'category',
          attributes: [],
        }
      ]
    });

    if (!instance) {
      return res.status(200).json({
        ...responses.notFound,
        message: 'Entry not found'
      });
    }

    return res.status(200).json({
      ...responses.success,
      result: instance,
    });
  } catch (err) {
    console.error(err);
    return res.status(200).json({
      ...responses.internalError,
    });
  }
};

/**
 * Updates an instance of the Entry given by the 'id' param with the data sent in the request body.
 */
export const update = async (req, res) => {
  const entryId = req.params.id;

  const { error, value } = validationSchema.validate(req.body);

  if (error) {
    return res.status(200).json({
      ...responses.validationError,
      message: 'Validation error',
      errorFields: formatValidationErrors(error)
    });
  }

  try {
    const instance = await Entry.findByPk(entryId);

    if (!instance) {
      return res.status(200).json({
        ...responses.notFound,
        message: 'Entry not found'
      });
    }

    // Update fields
    instance.set({
      ...value,
      deletedAt: instance.deletedAt,
      createdAt: instance.createdAt,
      updatedAt: Date.now(),
    });

    await instance.save();

    return res.status(200).json({
      ...responses.success,
      message: 'News entry updated',
      result: instance,
    });
  } catch (err) {
    console.error(err);
    return res.status(200).json({
      ...responses.internalError
    });
  }
};

export const create = async (req, res) => {
  const { error, value } = validationSchema.validate(req.body);

  if (error) {
    return res.status(200).json({
      ...responses.validationError,
      message: 'Validation error',
      errorFields: formatValidationErrors(error)
    });
  }

  try {
    const newEntry = await Entry.create({
      ...value,
      type: "news",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(200).json({
      ...responses.success,
      message: 'News entry created',
      result: newEntry
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      ...responses.internalError
    });
  }
};

export const destroy = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(200).json({
      ...responses.badRequest,
      message: 'Invalid id'
    });
  }

  try {
    const entry = await Entry.findOne({ where: { id: id } });

    if (!entry) {
      return res.status(200).json({
        ...responses.notFound,
        message: 'Entry not found'
      })
    }

    await Entry.destroy({ where: { id: id }, force: true });

    return res.status(200).json({
      ...responses.success,
      message: 'Entry deleted'
    });
  } catch (err) {
    return res.status(200).json({
      ...responses.internalError
    });
  }
};

export const list = async (req, res) => {
  try {
    const news = await paginate(
      Entry,
      req.query.limit,
      req.query.page,
      [['createdAt', 'DESC']],
      {
        type: "news",
      },
      {
        attributes: {
          include: [[sequelize.col("category.name"), "categoryName"]]
        },
        include: [
          {
            model: Category,
            required: false,
            as: 'category',
            attributes: [],
          }
        ]
      }
    );

    return res.status(200).json({
      ...responses.success,
      result: news
    });

  } catch (error) {
    console.log(error);
    return res.status(200).json({
      ...responses.internalError
    });
  }
};
