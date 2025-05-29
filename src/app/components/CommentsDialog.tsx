"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  List,
  ListItem as MuiListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { Comment } from "@/types";

export default function CommentsDialog({
  open,
  onClose,
  comments,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  comments: Comment[];
  loading: boolean;
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Коментарі</DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {comments.map(({ id, name, email, body }) => (
              <MuiListItem key={id} alignItems="flex-start">
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
              </MuiListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}
