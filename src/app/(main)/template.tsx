"use client";

import { ReactNode, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useThemeContext } from "@/context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const drawerWidth = 240;

export default function Template({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const id = params?.id;
  const { toggleColorMode, mode } = useThemeContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerItems = [
    { label: "Головна", href: "/", icon: <HomeIcon /> },
    { label: "Усі пости", href: "/posts", icon: <ListIcon /> },
    { label: "Створити пост", href: "/posts/create", icon: <AddIcon /> },
  ];

  const drawer = (
    <div>
      <List>
        {drawerItems.map(({ label, href, icon }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton
              component={Link}
              href={href}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
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
          {(() => {
            if (!pathname?.includes("/posts")) return "DOiT MVP";
            if (pathname.includes("/posts/create")) return "Створити пост";
            if (pathname.match(/^\/posts\/\d+$/))
              return `Пост #${pathname.split("/").pop()}`;
            return "Усі пости";
          })()}
          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
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
    </Box>
  );
}
