const fastify = require('fastify')({ logger: true })
const fastifyPassport = require('fastify-passport')
// const fastifySecureSession = require('fastify-secure-session')
const fs = require('fs')
const path = require('path')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const dotenv = require('dotenv').config()
fastify.register(require('fastify-secure-session'), {
  // the name of the session cookie, defaults to 'session'
  cookieName: 'my-session-cookie',
  // adapt this to point to the directory where secret-key is located
  key: fs.readFileSync(path.join(__dirname, 'secret-key')),
  cookie: {
    path: '/'
  }
})

fastify.register(fastifyPassport.initialize())
fastify.register(fastifyPassport.secureSession())

fastifyPassport.use('google', new GoogleStrategy({
    clientID:process.env.clientID,
    clientSecret:process.env.clientSecret,
    callbackURL: "http://localhost:5000/auth/google/callback"
}, function (accessToken,refreshToken,profile,cb) {
    cb(undefined, profile)
}
))

fastifyPassport.registerUserDeserializer(async(user,req) => {
    return user
})

fastifyPassport.registerUserSerializer(async(user,req) => {
    return user
})

fastify.get('/',
    async (req, res) => {
        return `👋 Hello ${req.user.displayName} 👋`
    }
)

fastify.get('/auth/google/callback',
    {preValidation: fastifyPassport.authenticate('google',{scope:['profile']})},
    async (req,res) => {
        res.redirect('/')
    }
)

fastify.get('/login', fastifyPassport.authenticate('google', {scope: ['profile']}))

fastify.get('/logout',
    async(req,res) => {
        req.logout()
        return {success:true}
    }
)

fastify.listen(5000)


///////////////////////////////////////////////////////////////////
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
