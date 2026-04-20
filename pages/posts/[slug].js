import { marked } from 'marked';
import Link from 'next/link';
import { getDb } from '../../lib/mongodb';

export async function getServerSideProps({ params }) {
  const db = await getDb();
  const post = await db.collection('posts').findOne({ slug: params.slug });
  if (!post) return { notFound: true };
  return {
    props: {
      title: post.title,
      date: post.date,
      html: marked(post.content),
    },
  };
}

export default function Post({ title, date, html }) {
  return (
    <main>
      <Link href="/">← Back</Link>
      <h1>{title}</h1>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}