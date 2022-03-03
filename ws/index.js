import express from 'express'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
import chat from './routes/chat'
app.use(chat)


// // const setRef = q.Match(q.Index('messages_by_chat'), chatId)
// const setRef = q.Documents(q.Collection("chat_messages"))
// const streamOptions = { fields: ['action', 'document'] }

// const report = async (e) => {
//     const { action, document } = e
//     if (action === 'add') {
//         const { ref: { value: { id }}} = document
//         const { data, ref: { value: { id: messageId }}} = await client.query(
//             q.Get(q.Ref(q.Collection('chat_messages'), id))
//         )
//         data.ref = messageId
//         io.emit(data.chat, data)
//     }
// }

// let stream
// const startStream = () => {
//     stream = client.stream(setRef, streamOptions)
//     // .on('start', start => { report(start) })
//     .on('set', set => { report(set) })
//     .on('error', error => {
//         console.log('Error:', error)
//         stream.close()
//         setTimeout(startStream, 1000)
//     })
//     .start()
// }

// startStream()

module.exports = {
  path: '/ws',
  handler: app
}

