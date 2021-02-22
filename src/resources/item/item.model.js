import mongoose from 'mongoose'

export const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  value: Number
})

itemSchema.post(/^findOneAndUpdate/, function(doc) {
  let notify = `${doc.name} => Updated price == ${doc.value}`
  console.log(notify)
  if (Object.keys(process.sockets).length) {
    for (let socket in process.sockets) {
      process.sockets[socket].emit('price', {
        name: doc.name,
        price: doc.value
      })
    }
  }
})

export const Item = mongoose.model('item', itemSchema)
