import mongoose from 'mongoose'
import itemControllers from '../item/item.controllers'
const itemDB = itemControllers.db

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
})
export const counter = mongoose.model('counter', CounterSchema)

export const orderSchema = new mongoose.Schema(
  {
    id: Number,
    uid: Number,
    status: String,
    items: [
      {
        itemId: Number,
        quantity: Number
      }
    ]
  },
  { timestamps: true }
)

orderSchema.pre('validate', function(next) {
  let doc = this
  counter.findByIdAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, function(
    error,
    counterRes
  ) {
    if (error) return next(error)
    if (!counterRes) {
      counter.create({ _id: 'entityId', seq: 1 })
    }
    let count = counterRes ? counterRes.seq + 1 : 1
    doc.id = count
    doc.status = 'ordered'
    next()
  })
})

orderSchema.post(/^findOneAndUpdate/, function(doc) {
  let notify = `${doc.id} => Updated status == ${doc.status}`
  console.log(notify)
  if (Object.keys(process.sockets).length) {
    for (let socket in process.sockets) {
      process.sockets[socket].emit('status', {
        id: doc.id,
        status: doc.status
      })
    }
  }
})

orderSchema.post('save', async function(doc) {
  console.log('Order Created => ID :' + doc.id)
  let modifiedItems = []
  for (let item of doc.items) {
    const expanded = await itemDB.get(item.itemId)
    modifiedItems.push({
      name: expanded.name,
      price: expanded.value,
      quantity: item.quantity
    })
  }
  const finalPayload = {
    orderId: doc.id,
    items: modifiedItems,
    status: doc.status
  }
  console.log('Emitting')
  console.log(finalPayload)
  if (Object.keys(process.sockets).length) {
    for (let socket in process.sockets) {
      console.log('Socket => ' + socket + 'notified')
      process.sockets[socket].emit('order', finalPayload)
    }
  }
})

export const Order = mongoose.model('order', orderSchema)
