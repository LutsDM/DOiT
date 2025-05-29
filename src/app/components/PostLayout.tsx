"use client";

import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
} from "@mui/material";
import { Post } from "@/types";
import PostActions from "@/app/components/PostActions";

export default function PostLayout({ id, title, body }: Post) {
  return (
    <Box sx={{ mt: 5, px: 20 }}>
      <Card elevation={3}>
        <CardHeader
          avatar={<Avatar>{title[0].toUpperCase()}</Avatar>}
          title={title}
          subheader={`Post ID: ${id}`}
        />
        <CardContent>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
        <CardActions>
          <PostActions postId={id} />
        </CardActions>
      </Card>
    </Box>
  );
}
