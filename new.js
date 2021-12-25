// const fastify = require('fastify')({})
// fastify.addHook('preParsing', (request, reply, payload, done) => {    
//   done(null, payload)
// })
// const start = async () => {
//   try {
//     fastify.get('/', function (request, reply) {
//       reply.send('hello world')

//     })


//     await fastify.listen(3000, '0.0.0.0',()=>{
//         console.log('connected')
//     })  
//   } catch (err) {
//     fastify.log.error(err)    
//     process.exit(1)
//   }
// }
// start()

//////////////////////////
const fastify = require('fastify')({})
fastify.addHook('preParsing', async (request, reply, payload) => {
    request.params.id=123
  return payload
})
const start = async () => {
  try {
    fastify.get('/d/:id', function (request, reply) {
      reply.send(request.params.id)
    })
    await fastify.listen(3000, '0.0.0.0')  
  } catch (err) {
    fastify.log.error(err)    
    process.exit(1)
  }
}
start()