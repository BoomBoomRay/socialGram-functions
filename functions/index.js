const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
app.get('/posts', (req, res) => {
  admin
    .firestore()
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(posts);
    })
    .catch((error) => console.error(error));
});

app.post('/post', (req, res) => {
  const newPost = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString(),
  };

  admin
    .firestore()
    .collection('posts')
    .add(newPost)
    .then((data) => {
      return res.json({ message: `document${data.id} created succesfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error' });
      console.error(err);
    });
});

// CHANGE REGION xports.api = functions.region('europe-west1').https.onRequest(app);
// by Default 'us-central'

exports.api = functions.https.onRequest(app);
