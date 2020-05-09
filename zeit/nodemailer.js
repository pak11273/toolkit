## Deploy zeit with express and nodemailer

1. Add an api directory in root directory.  And an index.js file in it with these contents:

```js
var nodemailer = require("nodemailer")
var micro = require("micro-cors")
const cors = micro()

function api(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }
  var data = req.body

  // node-mailer
  var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: process.env.GMAIL_USERNAME, // "USERNAME"
      pass: process.env.GMAIL_PASSWORD, // "PASSWORD"
    },
  })

  var mailOptions = {
    from: data.email,
    to: "dppoolserv@gmail.com",
    subject: data.subject,
    html: `<h2>Contact Name: ${data.name}</h2>
          <h2>Phone: ${data.phone}</h2>
          <h4>Subject: ${data.subject}</h4>
          <h4>Email: ${data.email}</h4>
          <h4>Message: ${data.message}</h4>`,
  }

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(`ERROR: ${error}`)
    } else {
      res.json({ email: "Success" })
    }
    smtpTransport.close()
  })
}

export default cors(api)
```

2. Add your .env variables GMAIL_USERNAME and GMAIL_PASSWORD

3. yarn add micro-cors dotenv nodemailer

4. Ensure in your goolge account goto: https://myaccount.google.com/lesssecureapps and turn on

5. Add your .env variables to zeit > project > settings > general > env variables

6. Deploy using now --prod

7. Done!
