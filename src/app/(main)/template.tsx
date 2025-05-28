"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  ListItemIcon,
  ListItem as MuiListItem,
  Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CommentIcon from "@mui/icons-material/Comment";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useThemeContext } from "@/context/ThemeContext";
import { Comment } from "@/types";

const drawerWidth = 240;

function getAppBarTitle(pathname: string): string {
  if (!pathname?.includes("/posts")) return "DOiT MVP";
  if (pathname.includes("/posts/create")) return "Створити пост";
  if (pathname.match(/^\/posts\/\d+$/)) return `Пост #${pathname.split("/").pop()}`;
  return "Усі пости";
}

export default function Template({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const postId = params?.id;

  const { toggleColorMode, mode } = useThemeContext();

  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState<number | null>(null);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    if (postId && pathname.match(/^\/posts\/\d+$/)) {
      setLoadingComments(true);
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data);
          setCommentsCount(data.length);
          setLoadingComments(false);
        })
        .catch(() => {
          setComments([]);
          setCommentsCount(null);
          setLoadingComments(false);
        });
    } else {
      setComments([]);
      setCommentsCount(null);
      setCommentsOpen(false); // Закрыть, если не на посте
    }
  }, [postId, pathname]);

  const drawerItems = [
    { label: "Головна", href: "/", icon: <HomeIcon /> },
    { label: "Усі пости", href: "/posts", icon: <ListIcon /> },
    { label: "Створити пост", href: "/posts/create", icon: <AddIcon /> },
  ];

  const drawer = (
    <div>
      <List>
        {drawerItems.map(({ label, href, icon }) => (
          <MuiListItem key={label} disablePadding>
            <ListItemButton
              component={Link}
              href={href}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </MuiListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#2196f3",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {getAppBarTitle(pathname)}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {pathname.match(/^\/posts\/\d+$/) && (
            <Tooltip title="Коментарі">
              <IconButton
                color="inherit"
                onClick={() => setCommentsOpen(true)}
                disabled={loadingComments}
              >
                <Badge
                  badgeContent={loadingComments ? "…" : commentsCount}
                  color="secondary"
                >
                  <CommentIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          )}
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: "block",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />
        {children}
      </Box>

      {/* Диалог комментариев */}
      <Dialog
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
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
    </Box>
  );
}
