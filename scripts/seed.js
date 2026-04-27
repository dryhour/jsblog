import { MongoClient } from 'mongodb';

const posts = [
];

const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const db = client.db('myblog');
// await db.collection('posts').deleteMany({});
await db.collection('posts').insertMany(posts);
await client.close();