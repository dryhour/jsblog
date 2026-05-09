# My Blog

A Next.js blog backed by MongoDB.

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project:

```env
MONGODB_URI=mongodb://localhost:27017
```

> If you're using MongoDB Atlas or a remote database, replace the value with your connection string.

### 4. Seed the database

Open `seed.js` and add your posts to the `posts` array. Each post should follow this format:

```javascript
const posts = [
  {
    title: "My First Post",
    slug: "my-first-post",        // used in the URL: /posts/my-first-post
    date: "2024-01-01",
    content: "# Hello\n\nThis is my first post written in **Markdown**.",
  },
];
```

Then run the seed script:

```bash
node seed.js
```

You should see:
```
Seeded 1 posts.
```

> To clear existing posts before re-seeding, uncomment this line in `seed.js`:
> ```js
> // await db.collection('posts').deleteMany({});
> ```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
/
├── lib/
│   └── mongodb.js        # MongoDB connection helper
├── pages/
│   └── posts/
│       └── [slug].js     # Dynamic post page
├── styles/
│   └── Post.module.css   # Post styles
├── seed.js               # Database seeder
└── .env.local            # Environment variables (not committed)
```

---

## Requirements

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/try/download/community) running locally on port `27017`, or a MongoDB Atlas connection string
