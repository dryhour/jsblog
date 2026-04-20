import Link from 'next/link';
import { getDb } from '../lib/mongodb';

export async function getServerSideProps() {
  const db = await getDb();
  const posts = await db.collection('posts').find({}).sort({ date: -1 }).toArray();
  return {
    props: {
      posts: posts.map(p => ({ slug: p.slug, title: p.title, date: p.date })),
    },
  };
}

export default function Home({ posts }) {
  return (
    <main>
      <h1>My Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}><strong>{post.title}</strong></Link>
            <span> ... {post.date}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}