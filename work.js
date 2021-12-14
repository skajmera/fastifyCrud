// fastify.decorate('data', [])

// fastify.register(async (instance, opts) => {
//   instance.data.push('hello')
//   console.log(instance.data) // ['hello']

//   instance.register(async (instance, opts) => {
//     instance.data.push('world')
//     console.log(instance.data) // ['hello', 'world']
//   }, { prefix: '/hola' })
// }, { prefix: '/ciao' })

// fastify.register(async (instance, opts) => {
//   console.log(instance.data) // []
// }, { prefix: '/hello' })

// fastify.addHook('onRegister', (instance, opts) => {
//   // Create a new array from the old one
//   // but without keeping the reference
//   // allowing the user to have encapsulated
//   // instances of the `data` property
//   instance.data = instance.data.slice()
//   // the options of the new registered instance
//   console.log(opts.prefix)
// })

/////////////////////////////////////////////////////
