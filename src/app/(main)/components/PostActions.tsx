"use client";

import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { deletePost } from "@/features/postsState/postsActions";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";

type Props = {
  postId: number;
};

export default function PostActions({ postId }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDelete = async () => {
    const confirm = window.confirm(
      `Ви впевнені, що хочете видалити пост з id: ${postId}?`
    );
    if (!confirm) return;
    try {
      await dispatch(deletePost(postId)).unwrap();
      alert("Пост успішно видалено");
      router.push("/posts");
    } catch (error) {
      console.error("Помилка при видаленні поста:", error);
      alert("Не вдалося видалити пост. Спробуйте ще раз.");
    }
  };
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <Button
        startIcon={<DeleteIcon />}
        onClick={handleDelete}
        sx={{
          backgroundColor: "red",
          color: "white",
          border: "1px solid red",
          "&:hover": {
            backgroundColor: "darkred",
            borderColor: "darkred",
          },
        }}
      >
        ВИДАЛИТИ
      </Button>
      <Button
        component={Link}
        href="/posts"
        startIcon={<ArrowBackIcon />}
        sx={{
          border: "1px solid blue",
        }}
      >
        ДО СПИСКУ
      </Button>
    </Box>
  );
}
