const functions = require('firebase-functions');

const app = require('express')();
const FBAuth = require('./util/fbAuth');

const { getAllPosts, singlePost } = require('./handlers/posts');
const { signUp, login } = require('./handlers/users');

// Post Routes
app.get('/posts', getAllPosts);
app.post('/post', FBAuth, singlePost);

// Users Routes
app.post('/signup', signUp);
app.post('/login', login);

// CHANGE REGION xports.api = functions.region('europe-west1').https.onRequest(app);
// by Default 'us-central'

exports.api = functions.https.onRequest(app);
