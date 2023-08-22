// Supports ES6
// import { create, Whatsapp } from '@wppconnect-team/wppconnect';
// const fs = require('fs');


const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect
  .create({
    session: 'sessionName',
    catchQR: (base64Qr, asciiQR) => {
      console.log(asciiQR); // Optional to log the QR in the terminal
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      var imageBuffer = response;
      require('fs').writeFile(
        'out.png',
        imageBuffer['data'],
        'binary',
        function (err) {
          if (err != null) {
            console.log(err);
          }
        }
      );
    },
    logQR: false,
    autoClose: false,
  })
  .then((client) => { start(client) })
  .catch((error) => console.log(error));


function start(client) {

  client.onMessage((message) => {
    if (message.body === 'Hello') {
      client
        .sendText(message.from, 'Mensagem automatizada para teste')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}

var express = require('express');
var app = express();

app.use('/', express.static(__dirname));
app.listen(3000, function () { console.log('listening') });