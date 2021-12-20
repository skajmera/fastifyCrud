const fastifyPassport = require("fastify-passport");
const userController = require("./user/user.controller");
const fs = require("fs");
const path = require("path");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const dotenv = require("dotenv").config();
exports.passport = (fastify, options) => {
  fastify.register(require("fastify-secure-session"), {
    cookieName: "my-session-cookie",
    key: fs.readFileSync(path.join(__dirname, "secret-key")),
    cookie: { path: "/" },
  });
  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());

  fastifyPassport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: "http://localhost:5000/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        cb(undefined, profile);
      }
    )
  );
  fastifyPassport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: process.env.githubId,
        clientSecret: process.env.githubSecret,
        callbackURL: "http://localhost:5000/auth/github/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        cb(undefined, profile);
        const data2 = {
          firstName: profile.username,
          email: profile.emails[0].value,
        };
        userController.passportLogin(data2)
      }
    )
  );

  fastifyPassport.registerUserDeserializer(async (user, req) => {
    return user;
  });
  fastifyPassport.registerUserSerializer(async (user, req) => {
    return user;
  });

  fastify.get("/secure", async (req, res) => {
    const data = {
      firstName: req.user.name.givenName,
      lastName: req.user.name.familyName,
      email: req.user.emails[0].value,
    };
    const result = userController.passportLogin(data);
    return result;
  });

  fastify.get("/success", async (req, res) => {
    return `👋 Hello this is github login page 👋`;
  });

  fastify.get(
    "/auth/google/callback",
    {
      preValidation: fastifyPassport.authenticate("google", {
        scope: ["email", "profile"],
      }),
    },
    async (req, res) => {
      res.redirect("/secure");
    }
  );
  fastify.get(
    "/auth/github/callback",
    {
      preValidation: fastifyPassport.authenticate("github", {
        scope: ["email", "profile"],
      }),
    },
    async (req, res) => {
      res.redirect("/success");
    }
  );
  fastify.get(
    "/login",
    fastifyPassport.authenticate("google", { scope: ["email", "profile"] })
  );
  fastify.get(
    "/loginByGithub",
    fastifyPassport.authenticate("github", { scope: ["email", "profile"] })
  );

  fastify.get("/logout", async (req, res) => {
    req.logout();
    return { success: true };
  });
};