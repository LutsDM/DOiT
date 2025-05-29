"use client";
import { Post } from "@/types";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Skeleton,
  SpeedDial,
  SpeedDialAction,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadPosts } from "@/features/postsState/postsActions";
import { useRouter } from "next/navigation";

export default function PostsPage() {
  const {
    posts,
    isLoading: loading,
    error,
  } = useAppSelector((state) => state.posts);
  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();

  const router = useRouter();
  useEffect(() => {
    dispatch(loadPosts());
  }, []);

  const filteredPosts: Post[] = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const loadingArray = Array.from({ length: 6 }) as (Post | undefined)[];

  return (
    <>
      {error && (
        <Typography color="error" variant="body1">
          Помилка: {error}
        </Typography>
      )}
      <Box
        sx={{
          px: { xs: 6, md: 15 },
          py: 0,
        }}
      >
        <TextField
          placeholder="Пошук"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Grid container spacing={3}>
          {(loading ? loadingArray : filteredPosts).map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={loading ? index : post!.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {loading ? (
                  <>
                    <Skeleton variant="rectangular" height={118} />
                    <Box sx={{ p: 2 }}>
                      <Skeleton variant="text" />
                      <Skeleton variant="text" width="60%" />
                    </Box>
                  </>
                ) : (
                  <>
                    <CardHeader
                      avatar={<Avatar>{post!.title[0].toUpperCase()}</Avatar>}
                      title={post!.title}
                      subheader={`ID: ${post!.id}`}
                      action={
                        <IconButton
                          color="error"
                          onClick={() => alert(`Delete post ${post!.id}`)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="body2">
                        {post!.body.slice(0, 100)}...
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-start" }}>
                      <Link href={`/posts/${post!.id}`}>
                        <IconButton component="a" size="small" color="primary">
                          <ArrowForwardIcon />
                        </IconButton>
                      </Link>
                    </CardActions>
                  </>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>

        <SpeedDial
          ariaLabel="Create new post"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<AddIcon />}
        >
          <SpeedDialAction
            icon={<AddIcon />}
            tooltipTitle="Створити пост"
            onClick={() => router.push("/posts/create")}
          />
        </SpeedDial>
      </Box>
    </>
  );
}
