import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { connect } from './shared/dbController'
import userRouter from './resources/user/user.router'
import itemRouter from './resources/item/item.router'
import orderRouter from './resources/order/order.router'
import { notFound } from './shared/middlewares'
const fs = require('fs')
const path = require('path')
export const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})
const sockets = {}
process.sockets = sockets

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/user', userRouter)
app.use('/api/item', itemRouter)
app.use('/api/order', orderRouter)

app.get('*', notFound)

app.use(function(err, req, res, next) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500 // Sets a generic server error status code if none is part of the err
  if (err.shouldRedirect) {
    fs.createReadStream(path.join(__dirname, '/shared/empty.html')).pipe(res) // Send 404 page
  } else {
    res.status(err.statusCode).send(err.message) // If shouldRedirect is not defined in our error, sends our original err data
  }
})
io.on('connection', socket => {
  sockets[socket.id] = socket

  socket.on('disconnect', () => {
    if (socket.id in sockets) {
      delete sockets[socket.id]
    }
  })
})

export const start = async () => {
  try {
    let connection = await connect()
    server.listen(3005, () => {
      console.log('\n')
      console.log('Server up and running -> Connected to Mongo')
      console.log('\n')
    })
    return connection
  } catch (e) {
    console.log(
      'Check if MONGODB is running, update the path at config/dev.js or set the env DB_URL'
    )
    console.error(e)
  }
}
