const { db } = require('../util/admin');

exports.getAllPosts = (req, res) => {
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
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: error.code });
    });
};

exports.singlePost = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: 'Body must not be empty' });
  }
  const newPost = {
    body: req.body.body,
    userHandle: req.user.handle,
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
};
