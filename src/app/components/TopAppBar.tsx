"use client";

import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CommentIcon from "@mui/icons-material/Comment";

function getAppBarTitle(pathname: string): string {
  if (!pathname?.includes("/posts")) return "DOiT MVP";
  if (pathname.includes("/posts/create")) return "Створити пост";
  if (pathname.match(/^\/posts\/\d+$/)) return `Пост #${pathname.split("/").pop()}`;
  return "Усі пости";
}

export default function TopAppBar({
  pathname,
  commentsCount,
  loadingComments,
  onCommentsClick,
  onToggleTheme,
  isPostPage,
  mode,
  onDrawerToggle,
}: {
  pathname: string;
  commentsCount: number | null;
  loadingComments: boolean;
  onCommentsClick: () => void;
  onToggleTheme: () => void;
  isPostPage: boolean;
  mode: string;
  onDrawerToggle: () => void;
}) {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#2196f3" }}>
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={onDrawerToggle} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {getAppBarTitle(pathname)}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {isPostPage && (
          <Tooltip title="Коментарі">
            <IconButton color="inherit" onClick={onCommentsClick} disabled={loadingComments}>
              <Badge badgeContent={loadingComments ? "…" : commentsCount} color="secondary">
                <CommentIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        )}
        <IconButton onClick={onToggleTheme} color="inherit">
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}