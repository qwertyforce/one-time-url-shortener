const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const crypto = require('crypto');
const cors = require('cors')
const https = require('https');
const fs = require('fs');
const path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.disable('x-powered-by');
const Links = {};
const port = 443;
// app.listen(port, () => {                                     //Uncomment if you want to use http
//     console.log(`Server is listening on port ${port}`);
// });

https.createServer({
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('cert.pem')
}, app).listen(port);

console.log(`Server is listening on port ${port}`);
app.use(function (req, res, next) {
  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }
  return next();
});
function handle_link(req, res, id) {
  const link = Links[id];
  if (link.error_before > 0) {
    Links[id].error_before -= 1;
    res.sendStatus(404)
    return
  }
  if (link.destroy_after > 0) {
    Links[id].destroy_after -= 1;
    res.redirect(link.url);
    return
  } else {
    delete Links[id]
    res.sendStatus(404)
    return
  }

}
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))        //You can comment this and try to hide shortener web interface  (serve frontend from another domain for example)
})

app.post('/link', (req, res) => {
  console.log(req.body)
  if (!req.body) {
    return res.status(400);
  }
  let Url = req.body.url.trim();
  const preview_protection = (req.body.preview_protection.trim() === "true") ? 1 : 0;
  const destroy_after = parseInt(req.body.destroy_after.trim());
  const error_before = parseInt(req.body.error_before.trim());

  if (!Url.includes('://')) {
    Url = `http://${Url}`
  }
  crypto.randomBytes(16, (err, buf) => {
    if (err) throw err;
    const id = buf.toString("base64").replace(/\/|=/g, '');
    Links[id] = {
      url: Url,
      preview_protection: preview_protection,
      destroy_after: destroy_after || 1,
      error_before: error_before || 0
    };
    console.log(id);
    res.send(id)
  });
});

app.get('/:id', (req, res) => {
  console.log(`Referer header presented - ${req.headers.referer !== undefined}`)
  const id = req.params.id;
  const link = Links[id]
  console.log(link)
  if (link) {
    if (link.preview_protection === 1) {
      if (req.headers.referer !== undefined) {
        handle_link(req, res, id);
      }
      else {
        res.sendStatus(404);
      }
    } else {
      handle_link(req, res, id);
    }
  } else {
    res.sendStatus(404);
  }
});
