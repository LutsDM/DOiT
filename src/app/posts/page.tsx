'use client';
import { Post } from "@/app/types"
import { useEffect, useState } from "react";
import {
  Box, Card, CardHeader, CardContent, CardActions,
  Avatar, Typography, IconButton, Button, TextField, InputAdornment,
  Skeleton, SpeedDial, SpeedDialAction,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';  
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from "next/link";


export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState ('');
    
   useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Помилка завантаження постів:', err))
      .finally(() => setLoading(false));
  }, []);

        const filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(search.toLowerCase())
        )

        return (
    <Box sx={{ p: 4 }}>
      <TextField
        placeholder="Пошук за заголовком"
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
        {(loading ? Array.from({ length: 6 }) : filteredPosts).map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={loading ? index : post.id}>
            <Card>
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
                    avatar={<Avatar>{post.title[0].toUpperCase()}</Avatar>}
                    title={post.title}
                    subheader={`ID: ${post.id}`}
                    action={
                      <IconButton onClick={() => alert(`Delete post ${post.id}`)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography variant="body2">
                      {post.body.slice(0, 100)}...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link href={`/posts/${post.id}`} passHref legacyBehavior>
                      <Button component="a" size="small">Перейти</Button>
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
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<AddIcon />}
      >
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="Створити пост"
          onClick={() => alert('TODO: redirect to create post')}
        />
      </SpeedDial>
    </Box>
  );
}