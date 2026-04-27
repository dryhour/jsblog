import { marked } from 'marked';
import Link from 'next/link';
import { getDb } from '../../lib/mongodb';
import styles from '../../styles/Post.module.css';

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
    <div className={styles.wrap}>
      <div className={styles.bubble1} />
      <div className={styles.bubble2} />

      <nav className={styles.nav}>
        <Link href="/" className={styles.back}>← back</Link>
      </nav>

      <article className={styles.article}>
        <div className={styles.meta}>
          <span className={styles.tag}>post</span>
          <span className={styles.date}>{date}</span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </div>
  );
}