import { crudController } from '../../shared/crudRestController'
import { User } from './user.model'
import { dbController } from '../../shared/dbController'

export default { route: crudController(User), db: dbController(User) }
