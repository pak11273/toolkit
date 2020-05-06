## Zeit Now Express Apps / Nodemailer / Gmail

### Create a gmail account (see zoho.md) if you haven't already

### Set env variables: username, password

- go to https://vercel.com/pak11273/project-name
- Settings > Production > Environment Variables

### Create a now.json in root directory of your project

```js
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@now/node-server" }],
  "routes": [
    {
      "src": "/",
      "dest": "/index.js",
      "methods": ["GET"]
    },
    {
      "src": "/users",
      "dest": "/index.js",
      "methods": ["GET"]
    },
    { "src": "/api/contact", "dest": "/index.js", "methods":["POST"] }
  ]
}
```

- Run "now --prod" in command line to deploy or redeploy

### Install dependencies

- npm install nodemailer cors dotenv body-parser --save

### Your express app needs this route added (app.js):

```js
app.post("/api/contact", (req, res) => {
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
    to: "pak11273@gmail.com",
    subject: data.subject,
    html: `<p>${data.name}</p>
          <p>${data.email}</p>
          <p>${data.message}</p>`,
  }

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(`ERROR: ${error}`)
    } else {
      res.send("Success")
    }
    smtpTransport.close()
  })
})
```

### If the above doesn't work then research the following:

- https://nodemailer.com/smtp/oauth2/#oauth-3lo
- https://www.mailgun.com/
- https://sendgrid.com/
