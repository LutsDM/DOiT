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
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from "next/link";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

export default function RootLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerItems = [
  { label: "Головна", href: "/", icon: <HomeIcon /> },
  { label: "Усі пости", href: "/posts", icon: <ListIcon /> },
  { label: "Створити пост", href: "/create", icon: <AddIcon /> },
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
    <html lang="uk">
      <body>
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
              <Typography variant="h6" noWrap>
                DOiT MVP
              </Typography>
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
              width: { md: `calc(100% - ${drawerWidth}px)` },
             
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
