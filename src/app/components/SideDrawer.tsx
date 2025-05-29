"use client";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem as MuiListItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

const drawerWidth = 240;

const drawerItems = [
  { label: "Головна", href: "/", icon: <HomeIcon /> },
  { label: "Усі пости", href: "/posts", icon: <ListIcon /> },
  { label: "Створити пост", href: "/posts/create", icon: <AddIcon /> },
];

export default function SideDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: "block",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {drawerItems.map(({ label, href, icon }) => (
          <MuiListItem key={label} disablePadding>
            <ListItemButton component={Link} href={href} onClick={onClose}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </MuiListItem>
        ))}
      </List>
    </Drawer>
  );
}
