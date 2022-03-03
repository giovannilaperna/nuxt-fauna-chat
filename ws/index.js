import { io } from './socket'
import { q, client } from './db'

const chat = '325076714366435528'
const setRef = q.Match(q.Index('messages_by_chat'), chat)
const streamOptions = { fields: ['action', 'document', 'index', 'diff'] }

const report = async (e) => {
    const { action, document } = e
    if (action === 'add') {
        console.log(document.ref)
        const { ref: { value: { id }}} = document
        const { data } = await client.query(
            q.Get(q.Ref(q.Collection('chat_messages'), id))
        )
        io.emit(chat, data)
    }
}

let stream
const startStream = () => {
    stream = client.stream(setRef, streamOptions)
    .on('start', start => { report(start) })
    .on('set', set => { report(set) })
    .on('error', error => {
        console.log('Error:', error)
        stream.close()
        setTimeout(startStream, 1000)
    })
    .start()
}

startStream()
  
// Since we are a serverMiddleware, we have to return a handler,
// even if this it does nothing
export default function (req, res, next) {
    next()
}

