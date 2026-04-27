import Link from 'next/link';
import { getDb } from '../lib/mongodb';
import styles from '../styles/Home.module.css';

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
    <div className={styles.wrap}>
      <nav className={styles.nav}>
        <span className={styles.logo}>my blog</span>
      </nav>

      <div className={styles.hero}>
        <h1 className={styles.title}>thoughts &amp; ideas</h1>
        <p className={styles.description}>
          My personal blog-post.
        </p>
      </div>

      <div className={styles.grid}>
        {posts.map((post, i) => (
          <Link href={`/posts/${post.slug}`} key={post.slug} className={`${styles.card} ${i === 0 ? styles.featured : ''}`}>
            <div className={styles.bubble1} />
            <div className={styles.bubble2} />
            <span className={styles.tag}>{i === 0 ? 'latest' : 'post'}</span>
            <h3>{post.title}</h3>
            <div className={styles.cardFooter}>
              <span className={styles.date}>{post.date}</span>
              <span className={styles.readBtn}>Read ↗</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}