require('dotenv').config()
const { createClient } = require('redis')

async function getClient(){
    const client = await createClient({
        url: process.env.REDIS_URL,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
    })

    await client.connect()
    return client
}

module.exports = {
    getClient
}