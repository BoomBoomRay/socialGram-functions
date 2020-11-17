const functions = require('firebase-functions');
const db = require('./util/admin');

const app = require('express')();
const FBAuth = require('./util/fbAuth');

const {
  getAllPosts,
  singlePost,
  getPost,
  commentOnPost,
  likePost,
  unlikePost,
  deletePost,
} = require('./handlers/posts');
const {
  signUp,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
} = require('./handlers/users');

// Post Routes
app.get('/posts', getAllPosts);
app.post('/post', FBAuth, singlePost);
app.get('/post/:postId', getPost);
app.post('/post/:postId/comment', FBAuth, commentOnPost);
app.delete('/post/:postId', FBAuth, deletePost);
app.get('/post/:postId/like', FBAuth, likePost);
app.get('/post/:postId/unlike', FBAuth, unlikePost);

// Users Routes
app.post('/signup', signUp);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

// CHANGE REGION xports.api = functions.region('europe-west1').https.onRequest(app);
// by Default 'us-central'

exports.api = functions.https.onRequest(app);
exports.createNotificationOnLike = functions
  .region('us-central1')
  .firestore.document(`likes/{id}`)
  .onCreate((snapshot) => {
    db.doc(`/posts/${snapshot.data().postId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            read: false,
            screamId: doc.id,
            type: 'like',
          });
        }
      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

exports.deleteNotificationOnUnlike = functions
  .region('us-central1')
  .firestore.document(`likes/{id}`)
  .onDelete((snapshot) => {
    db.doc(`/notifications/${snapshot.id}`)
      .delete()
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });
exports.createNotificationOnComment = functions
  .region('us-central1')
  .firestore.document(`comments/{id}`)
  .onCreate((snapshot) => {
    db.doc(`/posts/${snapshot.data().postId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            read: false,
            screamId: doc.id,
            type: 'comment',
          });
        }
      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });
