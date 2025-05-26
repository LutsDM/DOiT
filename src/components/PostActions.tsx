"use client";

import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

type Props = {
  postId: number;
};

export default function PostActions({ postId }: Props) {
  const handleDelete = () => {
    alert(`Видалити пост з id: ${postId}`);
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
        href="/"
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
