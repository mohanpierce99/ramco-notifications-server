import { create, get, remove, findAndUpdate } from './dbController'

// ALL common controllers i.e crud for all resources exist here

const getOne = model => async (req, res) => {
  try {
    const doc = await get(model, req.params.id)
    if (!doc) {
      return res.status(400).end()
    }
    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const createOne = model => async (req, res) => {
  try {
    const doc = await create(model, req.body)
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const updateOne = model => async (req, res) => {
  try {
    const updatedDoc = await findAndUpdate(model, req.filter, req.body)
    if (!updatedDoc) {
      return res.status(400).end()
    }
    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const removeOne = model => async (req, res) => {
  try {
    const removed = await remove(model, req.filter)

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

// CLOSURE Module pattern

export const crudController = model => ({
  updateOne: updateOne(model),
  createOne: createOne(model),
  getOne: getOne(model),
  removeOne: removeOne(model)
})
