'use client';
import { Post } from "@/app/types"
import { useEffect, useState } from "react";
import {
    Box, Grid, Card, CardHeader, CardContent, CardActions,
    Avatar, Typography, IconButton, Button, TextField, InputAdornment,
    Skeleton, SpeedDial, SpeedDialAction
  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';  

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState ('');
    
    useEffect (() => {
        fetch ('https://jsonplaceholder.typicode.com/posts')
            .then (res => res.json())
            .then (data => {
                setPosts(data);
                setLoading(false);
            });
        }, []);  

        const filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(search.toLowerCase())
        )

        return (
            <Box sx={{ p: 4 }} >
                      <TextField
        placeholder="Пошук за заголовком"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

            </Box>
        )




    }
    
































}