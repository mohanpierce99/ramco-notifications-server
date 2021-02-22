// import axios from 'axios'
const axios = require('axios')
const host = 'http://localhost:3000'

const post = async (route, payload) => {
  try {
    const {
      data: { data }
    } = await axios.post(host + route, payload)
    return data
  } catch (error) {
    throw new Error(error)
  }
}

const get = async route => {
  try {
    const {
      data: { data }
    } = await axios.get(host + route)
    return data
  } catch (error) {
    throw new Error(error)
  }
}
// post('/api/item/update', { id: 1, value: 300 })
//   .then(console.log)
//   .catch(console.error)

// post('/api/order/create', {
//   uid: 5,
//   items: [
//     { itemId: 1, quantity: 5 },
//     { itemId: 2, quantity: 5 },
//     { itemId: 3, quantity: 5 }
//   ]
// })
//   .then(console.log)
//   .catch(console.error)

get('/api/order/1')
  .then(console.log)
  .catch(console.error)

module.exports = { post, get }
