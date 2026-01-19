const redis=require('redis')
const client=redis.createClient({ url: 'redis://127.0.0.1:6379/1' })
client.connect() 
        .then(() => console.log('Redis connected!'))
        .catch(err => console.error('Redis connection error:', err));
module.exports={
    client
}