const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
admin.initializeApp();

const firebaseConfig = {
  apiKey: 'AIzaSyALmJgoU688Fv2SZpFVqPaYUB7xXcFRJCw',
  authDomain: 'musicgram-bbb50.firebaseapp.com',
  databaseURL: 'https://musicgram-bbb50.firebaseio.com',
  projectId: 'musicgram-bbb50',
  storageBucket: 'musicgram-bbb50.appspot.com',
  messagingSenderId: '18208058620',
  appId: '1:18208058620:web:f38e2561e225372b7cbb79',
};
const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);
const db = admin.firestore();

app.get('/posts', (req, res) => {
  db.collection('posts')
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
  db.collection('posts')
    .add(newPost)
    .then((data) => {
      return res.json({ message: `document${data.id} created succesfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error' });
      console.error(err);
    });
});
app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };
  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: 'this handle is already taken' });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((promiseToken) => {
      token = promiseToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already in use' });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

// CHANGE REGION xports.api = functions.region('europe-west1').https.onRequest(app);
// by Default 'us-central'

exports.api = functions.https.onRequest(app);
