import { MongoClient } from 'mongodb';

const posts = [
  {
    slug: 'test-post2',
    title: 'test post',
    date: '2026-04-20',
    content: '# Awesome test\n\nThis is a test? Ok.',
  },
];

const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const db = client.db('myblog');
// await db.collection('posts').deleteMany({});
await db.collection('posts').insertMany(posts);
await client.close();