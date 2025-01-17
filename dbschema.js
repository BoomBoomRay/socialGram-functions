let db = {
  users: [
    {
      userId: 'dh292839239',
      email: 'user@gmail.com',
      handle: 'user',
      createdAt: '2019-03-15T10:59:52.798Z',
      imageUrl: 'image/skjds/sdsdsd',
      bio: 'Hello world, nice to meet you',
      website: 'https://user.com',
      location: 'Vancouver, Ca',
    },
  ],
  posts: [
    {
      userHandle: 'user',
      body: 'this is the scream body',
      createdAt: '2020-11-05T22:58:35.369Z',
      likeCount: 5,
      commentCount: 2,
    },
  ],
  comments: [
    {
      userHandle: 'user',
      postId: 'kdjsfgdksuufhgkdsufky',
      body: 'nice one mate!',
      createdAt: '2019-03-15T10:59:52.798Z',
    },
  ],
  notifications: [
    {
      recipient: 'user',
      sender: 'john',
      read: 'true | false',
      postId: 'kdjsfgdkpostkdsufky',
      type: 'like | comment',
      createdAt: '2019-03-15T10:59:52.798Z',
    },
  ],
};
const userDetails = {
  // Redux data
  credentials: {
    userId: 'N43KJ5H43KJHREW4J5H3JWMERHB',
    email: 'user@email.com',
    handle: 'user',
    createdAt: '2019-03-15T10:59:52.798Z',
    imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
    bio: 'Hello, my name is user, nice to meet you',
    website: 'https://user.com',
    location: 'Lonodn, UK',
  },
  likes: [
    {
      userHandle: 'user',
      postId: 'hh7O5oWfWucVzGbHH2pa',
    },
    {
      userHandle: 'user',
      postId: '3IOnFoQexRcofs5OhBXO',
    },
  ],
};
