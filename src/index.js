import { start } from './server'
import userController from './resources/user/user.controllers'
import itemController from './resources/item/item.controllers'
import orderController from './resources/order/order.controllers'
import sampleItems from './resources/item/sample.json'
import sampleUsers from './resources/user/sample.json'
const userDB = userController.db
const itemDB = itemController.db
const orderDB = orderController.db
const counterDB = orderController.counterdb

async function init() {
  await start()
  await counterDB.deleteAll('counters')
  await orderDB.deleteAll('order')
  await userDB.deleteAll('user')
  for (let sampleUser of sampleUsers) {
    await userDB.create(sampleUser)
  }
  await itemDB.deleteAll('item')
  for (let sampleItem of sampleItems) {
    await itemDB.create(sampleItem)
  }
}

init()
