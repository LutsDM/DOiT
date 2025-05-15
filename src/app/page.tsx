import { Post } from "@/app/types"
import Link from "next/link";


async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}


export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main >
      <ul>
        {posts.slice(0, 9).map((post) => (
            <li key={post.id} style={{ marginBottom: 15 }}>
            <h3>
              <Link href={`/posts/${post.id}`}>
                {post.title}
              </Link>
            </h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}