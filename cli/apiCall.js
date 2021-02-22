// import axios from 'axios'
const axios = require('axios')
const host = 'http://localhost:3005'

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
// post('/api/order/update', { id: 1, status: 'ordered' })
//   .then(console.log)
//   .catch(console.error)

// post('/api/order/create', {
//   uid: 1,
//   items: [{ itemId: 4, quantity: 3 }]
// })
//  .then(console.log)
//  .catch(console.error)

// get('/api/item/1')
//   .then(console.log)
//   .catch(console.error)

module.exports = { post, get }
