"use client";

import { ReactNode, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

const drawerWidth = 240;

export default function RootLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerItems = [
    { label: "Головна", href: "/" },
    { label: "Усі пости", href: "/posts" },
    { label: "Створити пост", href: "/posts/create" },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {drawerItems.map(({ label, href }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton
              component={Link}
              href={href}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <html lang="uk">
      <body>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          {/* AppBar */}
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#2196f3",
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "block" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                DOiT MVP
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Drawer (Mobile version) */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "block", md: "none" },
              "& .MuiDrawer-paper": { width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>

          {/* Drawer (Desktop version) */}
          <Drawer
            variant="temporary"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            open
          >
            {drawer}
          </Drawer>

          {/* Контент сторінки */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { md: `calc(100% - ${drawerWidth}px)` },
              ml: { md: `${drawerWidth}px` },
            }}
          >
            <Toolbar />
            {children}
          </Box>
        </Box>
      </body>
    </html>
  );
}
