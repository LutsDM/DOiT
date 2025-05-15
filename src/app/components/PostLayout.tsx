"use client";

import React, { useState, useEffect } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import PostActions from "@/app/components/PostActions";
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

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

type Props = {
  postId: number;
  postTitle: string;
  postBody: string;
};

export default function PostLayout({ postId, postTitle, postBody }: Props) {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const toggleComments = () => setCommentsOpen(!commentsOpen);

  useEffect(() => {
    if (commentsOpen) {
      setLoadingComments(true);
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data);
          setLoadingComments(false);
        });
    }
  }, [commentsOpen, postId]);

  return (
    <Box sx={{ mt: 5, px: 20 }}>
      <Card elevation={3}>
        <CardHeader
          avatar={<Avatar>{postTitle[0].toUpperCase()}</Avatar>}
          title={postTitle}
          subheader={`Post ID: ${postId}`}
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
          <Typography variant="body1">{postBody}</Typography>
        </CardContent>
        <CardActions>
          <PostActions postId={postId} />
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
