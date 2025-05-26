"use client";

import React, { useState, useEffect } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import PostActions from "@/components/PostActions";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Badge
} from '@mui/material';
import { Comment, Post } from "@/types";

export default function PostLayout({ id, title, body }: Post) {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const toggleComments = () => setCommentsOpen(!commentsOpen);

  useEffect(() => {
    if (commentsOpen) {
      setLoadingComments(true);
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data);
          setLoadingComments(false);
        });
    }
  }, [commentsOpen, id]);

  return (
    <Box sx={{ mt: 5, px: 20 }}>
      <Card elevation={3}>
        <CardHeader
          avatar={<Avatar>{title[0].toUpperCase()}</Avatar>}
          title={title}
          subheader={`Post ID: ${id}`}
          action={
            <Button
              startIcon={
                <Badge badgeContent={comments.length} color="secondary">
                  <CommentIcon />
                </Badge>
              }
              onClick={toggleComments}
              variant="outlined"
              size="small"
            >
              Коментарі
            </Button>
          }
        />
        <CardContent>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
        <CardActions>
          <PostActions postId={id} />
        </CardActions>
      </Card>

      <Dialog
        open={commentsOpen}
        onClose={toggleComments}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Коментарі</DialogTitle>
        <DialogContent dividers>
          {loadingComments ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {comments.map(({ id, name, email, body }) => (
                <ListItem key={id} alignItems="flex-start">
                  <ListItemText
                    primary={name}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {email}
                        </Typography>
                        {" — "}
                        {body}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
