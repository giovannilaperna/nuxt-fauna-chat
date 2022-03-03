import express from 'express'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
import chat from './routes/chat'
import chats from './routes/chats'
app.use(chat)
app.use(chats)

module.exports = {
  path: '/ws',
  handler: app
}

