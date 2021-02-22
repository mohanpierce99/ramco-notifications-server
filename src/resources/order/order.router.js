import { Router } from 'express'
import controllers from './order.controllers'
import { createFilter } from '../../shared/middlewares'
const {
  route: { createOne, updateOne, removeOne, getOne }
} = controllers
const router = Router()

router.post('/create', createOne)
router.post('/update', createFilter, updateOne)
router.post('/remove', createFilter, removeOne)
router.get('/:id', getOne)

export default router
