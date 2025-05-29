"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getPostById } from "@/features/postsState/postsActions";
import PostLayout from "@/app/components/PostLayout";
import CircularProgress from "@mui/material/CircularProgress";

export default function PostPage() {
  const params = useParams();
  const id = params?.id;

  const numericId = Number(id);

  const dispatch = useAppDispatch();
  const { currentPost, isLoading, error } = useAppSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (!numericId || isNaN(numericId)) {
      console.warn("Invalid or missing ID in params");
      return;
    }

    dispatch(getPostById(numericId));
  }, [dispatch, numericId]);

  if (isLoading)
    return <CircularProgress size={60} thickness={5} color="primary" />;
  if (error) return <p style={{ color: "red" }}>Помилка: {error}</p>;

  if (!currentPost && !isLoading) {
    return <p>Пост не знайдено</p>;
  }

  if (!currentPost) return null;

  return (
    <PostLayout
      id={currentPost.id}
      title={currentPost.title}
      body={currentPost.body}
    />
  );
}
