import { notFound } from "next/navigation";
import { Post } from "@/types";
import PostLayout from "@/components/PostLayout";

async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!res.ok) {
    return null;
  }

  return res.json();
}

type Props = {
  params: { id: string };
};

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <PostLayout id={post.id} title={post.title} body={post.body} />
  );
}
