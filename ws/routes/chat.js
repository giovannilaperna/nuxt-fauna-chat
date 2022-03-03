import asyncHandler from 'express-async-handler'
import { Router } from 'express'
const router = Router()
import { q, client } from '../db'

router.post('/chat', asyncHandler(async (req, res) => {
    const props = {}
    props.user = 'foo'
    props.created_at = new Date().toISOString()
    props.status = 'open'
    const { ref: { value: { id: chatId }}} = await client.query(
        q.Create(
            q.Collection('chats'),
            { data: props },
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