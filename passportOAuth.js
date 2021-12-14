const fastifyPassport = require('fastify-passport')
const fs = require('fs')
const path = require('path')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const dotenv = require('dotenv').config()
exports.passport = (fastify, options) => {
fastify.register(require('fastify-secure-session'), {
  cookieName: 'my-session-cookie',
  key: fs.readFileSync(path.join(__dirname,'secret-key')),
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

fastify.get('/secure',
    async (req, res) => {
        console.log(req.user);
        return `👋 Hello ${req.user.displayName} 👋`
    }
)

fastify.get('/auth/google/callback',
    {preValidation: fastifyPassport.authenticate('google',{scope:['profile']})},
    async (req,res) => {
        res.redirect('/secure')
    }
)

fastify.get('/login', fastifyPassport.authenticate('google', {scope: ['profile']}))

fastify.get('/logout',
    async(req,res) => {
        req.logout()
        return {success:true}
    }
)}
