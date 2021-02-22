import { crudController } from '../../shared/crudRestController'
import { Item } from './item.model'
import { dbController } from '../../shared/dbController'

export default { route: crudController(Item), db: dbController(Item) }
