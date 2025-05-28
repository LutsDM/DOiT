"use client";
import  SideDrawer  from "@/app/(main)/components/SideDrawer";
import  TopAppBar  from "@/app/(main)/components/TopAppBar";
import  CommentsDialog  from "@/app/(main)/components/CommentsDialog";
import { ReactNode, useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { useThemeContext } from "@/context/ThemeContext";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Comment } from "@/types";

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

  const isPostPage = Boolean(postId && pathname.match(/^\/posts\/\d+$/));

  useEffect(() => {
    if (isPostPage) {
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
      setCommentsOpen(false);
    }
  }, [postId, pathname]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopAppBar
        pathname={pathname}
        commentsCount={commentsCount}
        loadingComments={loadingComments}
        onCommentsClick={() => setCommentsOpen(true)}
        onToggleTheme={toggleColorMode}
        isPostPage={isPostPage}
        mode={mode}
        onDrawerToggle={() => setMobileOpen(!mobileOpen)}
      />
      <SideDrawer
        open={mobileOpen} 
        onClose={() => setMobileOpen(false)}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
      <CommentsDialog
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        loading={loadingComments}
        comments={comments}
      />
    </Box>
  );
}
