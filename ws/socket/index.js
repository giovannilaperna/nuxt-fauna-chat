export const io = require("socket.io")(3001, {
    withCredentials: true,
    cors: {
        credentials: true,
        origin: process.env.URL || '*',
    }
})