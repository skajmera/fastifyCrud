// const fastify = require('fastify')()
// fastify.register(require('fastify-nodemailer'), {
//   pool: true,
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true, // use TLS
//   auth: {
//       user: 'subhashajmera2@gmail.com',
//       pass: 's5@9009120899'
//   }

// })
 
// fastify.get('/sendmail/:email', (req, reply, next) => {
//   let { nodemailer } = fastify
//   let recipient = req.params.email
 
//   fastify.nodemailer.sendMail({
//     from: 'subhashajmera2@gmail.com',
//     to: recipient,
//     subject: 'foo',
//     text: 'bar'
//   }, (err, info) => {
//     if (err) next(err)
//     reply.send({
//       messageId: info.messageId
//     })
//   })
// })
 
// fastify.listen(3000, err => {
//   if (err) throw err
//   console.log(`server listening on ${fastify.server.address().port}`)
// })
/////////////////////////////////////////////////

exports.myfunction=(a)=>{
    console.log(a)
}