const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const express = require('express');

const app = express();
app.use(require('prerender-node'));
app.get('**', (req, res) => {
 res.sendFile('build/index.html', {'root': '.'});
});

exports.prerenderReqHandler = functions.https.onRequest(app);
