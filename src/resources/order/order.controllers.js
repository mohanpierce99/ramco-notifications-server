import { crudController } from '../../shared/crudRestController'
import { Order, counter } from './order.model'
import { dbController } from '../../shared/dbController'

export default {
  route: crudController(Order),
  db: dbController(Order),
  counterdb: dbController(counter)
}
