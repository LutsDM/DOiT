"use client";

import Link from "next/link";
import { Box, Typography, Button, Container } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function Hero() {
  return (
    <Box
      sx={{
        minHeight: "80px",
        maxWidth: "800px",
        mx: "auto",
        display: "flex",
        background: "linear-gradient(to right, #E2F2FC, #F2E5F5)",
        color: "#4C4F53",
        py: 8,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Container>
        <Typography variant="h3" component="h4" gutterBottom>
          Ласкаво просимо до DOiT MVP
        </Typography>
        <Typography variant="subtitle1" component="p" gutterBottom>
          Ми працюємо над MVP освітньої платформи. Приєднуйтесь до команди!
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Link href="/posts">
            <Button
              variant="contained"
              size="medium"
              sx={{ mt: 2, backgroundColor: "#1976d2", color: "#fff" }}
              startIcon={<ListIcon />}
            >
              Переглянути пости
            </Button>
          </Link>

          <Link href="/posts/create">
            <Button
              variant="outlined"
              size="medium"
              sx={{ mt: 2, backgroundColor: "transparent", color: "#1976d2" }}
              startIcon={<AddCircleIcon />}
            >
              Додати пост
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
