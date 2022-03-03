import asyncHandler from 'express-async-handler'
import { Router } from 'express'
const router = Router()
import { q, client } from '../db'
import { io } from '../socket'

const setRef = q.Documents(q.Collection("chat_messages"))
const streamOptions = { fields: ['action', 'document'] }

const report = async (e) => {
    const { action, document } = e
    if (action === 'add') {
        const { ref: { value: { id }}} = document
        const { data, ref: { value: { id: messageId }}} = await client.query(
            q.Get(q.Ref(q.Collection('chat_messages'), id))
        )
        data.ref = messageId
        io.emit(data.chat, data)
    }
}

let stream
const startStream = () => {
    stream = client.stream(setRef, streamOptions)
    // .on('start', start => { report(start) })
    .on('set', set => { report(set) })
    .on('error', error => {
        console.log('Error:', error)
        stream.close()
        setTimeout(startStream, 1000)
    })
    .start()
}

startStream()

router.post('/chat/open', asyncHandler(async (req, res) => {
    req.body.user = 'foo'
    req.body.created_at = new Date().toISOString()
    req.body.status = 'open'
    const { ref: { value: { id: chatId }}} = await client.query(
        q.Create(
            q.Collection('chats'),
            { data: req.body },
        )
    )
    
    res.status(201).json({ chatId })
}))

router.post('/chat/:ref/close', asyncHandler(async (req, res) => {
    const { ref } = req.params
    await client.query(
        q.Update(
            q.Ref(q.Collection('chats'), ref),
            {
                data: {
                    status: 'close'
                }
            },
        )
    )
    
    res.status(201).json({})
}))

router.post('/chat/:ref/message', asyncHandler(async (req, res) => {
    const { message } = req.body
    const { ref } = req.params
    message.chat = ref

    const { data } = await client.query(
        q.Create(
            q.Collection('chat_messages'),
            { data: message },
        )
    )
    
    res.status(201).json(data)
}))


module.exports = router