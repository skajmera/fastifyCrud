// const fastify=require('fastify')()
const fastifyPassport = require('fastify-passport')
const fs = require('fs')
const path = require('path')
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv').config()
exports.githubOAuth = (fastify, options) => {
fastify.register(require('fastify-secure-session'), {
  cookieName: 'git-session-cookie',
  key: fs.readFileSync(path.join(__dirname,'secret-key')),
  cookie: {
    path: '/',
  }
})

fastify.register(fastifyPassport.initialize())
fastify.register(fastifyPassport.secureSession())

fastifyPassport.use('github', new GitHubStrategy({
    clientID:process.env.githubId,
    clientSecret:process.env.githubSecret,
    callbackURL: "http://localhost:5000/auth/github/callback"
}, function (accessToken,refreshToken,profile,cb) {
    cb(undefined, profile)
  }
))

fastifyPassport.registerUserDeserializer(async(user,req) => {
    return user
})

fastifyPassport.registerUserSerializer(async(user,cb) => {
    return user
})

fastify.get('/sec',
    async (req, res) => {
    return `👋 Hello ${req.user.displayName} 👋`
    }
)

fastify.get('/auth/github/callback',
    {preValidation: fastifyPassport.authenticate('github',{scope:["profile"]})},
      async (req,res) => {
        res.redirect('/sec')
    }
)

fastify.get('/login', fastifyPassport.authenticate('github', {scope: ["profile"]}))

fastify.get('/logout',
    async(req,res) => {
        req.logout()
        return {success:true}
    }
)
}


//////////////////////////////////////////////////
// // 'use strict';
// const fastify=require('fastify')()
// const fastifyPassport = require('fastify-passport')
// const fs = require('fs')
// const path = require('path')
// const GitHubStrategy = require("passport-github2").Strategy;
// const dotenv = require('dotenv').config()
// // exports.githubOAuth = (fastify,options) => {
// fastify.register(require('fastify-secure-session'), {
//   cookieName: 'github-session-cookie',
//   key: fs.readFileSync(path.join(__dirname,'secret-key')),
//   cookies: {
//     path: '/'
//   }
// })

// fastify.register(fastifyPassport.initialize())
// fastify.register(fastifyPassport.secureSession())

// fastifyPassport.use('github', new GitHubStrategy({
//     clientID: process.env.githubId,
//     clientSecret: process.env.githubSecret,
//     callbackURL: "http://localhost:5000/auth/github/callback"
// }, function (accessToken,refreshToken,profile,cb) {
//     console.log(profile.username,profile.displayName);
//     cb(undefined, profile)
// }
// ))

// fastifyPassport.registerUserDeserializer(async(user,req) => {
//     return user
// })

// fastifyPassport.registerUserSerializer(async(user,req) => {
//     return user
// })

// fastify.get('/secure',
//     async (req, res) => {
//         console.log(req.user);
//         return `👋 Hello ${req.user.displayName} 👋`
//     }
// )

// fastify.get('/auth/github/callback',
//     {preValidation: fastifyPassport.authenticate('github',{scope:['profile']})},
//     async (req,res) => {
//         res.redirect('/secure')
//     }
// )

// fastify.get('/login', fastifyPassport.authenticate('github', {scope: ['profile']}))

// fastify.get('/logout',
//     async(req,res) => {
//         req.logout()
//         return {success:true}
//     }
// )
// // }

// fastify.listen(5000,()=>{
//     console.log('connected');
// })
// ////////////////////////////////


////////////////////////////
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
