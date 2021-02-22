import mongoose from 'mongoose'
import options from '../config/dev'
import { curry } from 'lodash'

export const connect = (url = options.dbUrl, opts = {}) => {
  return mongoose.connect(url, { ...opts, useNewUrlParser: true })
}

export const deleteAllDocuments = async (model, stub) => {
  try {
    await model.deleteMany({})
  } catch (error) {
    throw new Error(error)
  }
}

export const findAndUpdate = async (model, filter, body) => {
  try {
    return await model
      .findOneAndUpdate(filter, body, { new: true })
      .lean()
      .exec()
  } catch (error) {
    throw new Error(error)
  }
}

export const remove = async (model, filter) => {
  try {
    return await model.findOneAndRemove(filter)
  } catch (error) {
    throw new Error(error)
  }
}

export const create = async (model, body) => {
  try {
    return await model.create({ ...body })
  } catch (error) {
    throw new Error(error)
  }
}

export const get = async (model, id) => {
  try {
    return await model
      .findOne({ id })
      .lean()
      .exec()
  } catch (error) {
    throw new Error(error)
  }
}

// Curry pattern - Does what module pattern in crudController does but here the function is curried Diff way of doing the same thing - the FP way

export const dbController = model => ({
  deleteAll: curry(deleteAllDocuments)(model),
  create: curry(create)(model),
  get: curry(get)(model),
  update: curry(findAndUpdate)(model),
  remove: curry(remove)(model)
})
