import asyncHandler from 'express-async-handler'
import { Router } from 'express'
const router = Router()
import { io } from '../socket'
import { q, client } from '../db'

const setRef = q.Match(q.Index('chats_by_status'), 'open')
const streamOptions = { fields: ['action', 'document'] }

const report = async (e) => {
    const { action, document } = e
    if (action === 'add') {
        const { ref: { value: { id }}} = document
        const { data, ref: { value: { id: chatId }}} = await client.query(
            q.Get(q.Ref(q.Collection('chats'), id))
        )
        data.ref = chatId
        io.emit('chats', { action: 'add', data })
    } else if (action === 'remove') {
        const { ref: { value: { id: ref }}} = document
        io.emit('chats', { action: 'remove', data: { ref }})
    }
}

let stream
const startStream = () => {
    stream = client.stream(setRef, streamOptions)
    // .on('start', start => { console.log('start', start) })
    .on('set', set => { report(set) })
    .on('error', error => {
        console.log('Error:', error)
        stream.close()
        setTimeout(startStream, 1000)
    })
    .start()
}

startStream()

router.get('/chats/:status', asyncHandler(async (req, res) => {
    const { status } = req.params

    const { data } = await client.query(
        q.Map(
            q.Paginate(
                q.Match(q.Index('chats_by_status'), status),
                { size: 100000 }
            ),
            q.Lambda(["created_at", "ref"], q.Get(q.Var("ref")))
        )
    )

    const chats = data.map(({ data, ref: { value: { id }}}) => {
        data.ref = id
        return data
    })
    
    res.status(201).json(chats)
}))

module.exports = router