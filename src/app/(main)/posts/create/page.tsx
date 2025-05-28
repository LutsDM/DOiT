"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { createPost } from "@/features/posts/postsActions";
import { INewPost } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import SaveIcon from "@mui/icons-material/Save";

const steps = ["Заголовок", "Тіло", "Попередній перегляд"];

export default function CreatePostPage() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState("");
  const [tempBody, setTempBody] = useState("");

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      const newPost: INewPost = {
        title,
        body,
      };
      dispatch(createPost(newPost));
      setOpenSnackbar(true);
      setTimeout(() => {
        router.push("/posts");
      }, 1500);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleOpen = () => {
    setTempTitle(title);
    setTempBody(body);
    setIsEditing(false);
    setOpen(true);
  };

  const handleConfirm = () => {
    setTitle(tempTitle);
    setBody(tempBody);
    setOpen(false);
  };

  return (
    <Container sx={{ boxShadow: 5, p: 5 }} maxWidth="sm">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Box sx={{ mt: 3 }}>
          <TextField
            label="Заголовок"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
      )}

      {activeStep === 1 && (
        <Box sx={{ mt: 3 }}>
          <TextField
            label="Тіло поста"
            fullWidth
            multiline
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onClick={handleOpen}
          />
        </Box>
      )}

      {activeStep === 2 && (
        <Dialog open={open} fullWidth onClose={() => setOpen(false)}>
          <DialogTitle>Попередній перегляд</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ mt: 3 }}>
              {isEditing ? (
                <>
                  <TextField
                    fullWidth
                    label="Заголовок"
                    sx={{ mb: 2 }}
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Тіло поста"
                    value={tempBody}
                    onChange={(e) => setTempBody(e.target.value)}
                  />
                </>
              ) : (
                <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
                  <Typography variant="h5" gutterBottom>
                    {title || "Без заголовка"}
                  </Typography>
                  <Typography variant="body1">
                    {body || "Без тексту"}
                  </Typography>
                </Box>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 4,
              }}
            >
              {!isEditing && (
                <Button variant="outlined" onClick={() => setIsEditing(true)}>
                  Редагувати
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleConfirm}
                disabled={isEditing && (!tempTitle.trim() || !tempBody.trim())}
              >
                Підтвердити
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}

      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Назад
        </Button>
        <Button
          onClick={handleNext}
          variant="contained"
          disabled={
            (activeStep === 0 && !title.trim()) ||
            (activeStep === 1 && !body.trim())
          }
        >
          {activeStep === steps.length - 1 ? "Зберегти" : "Далі"}
          <SaveIcon sx={{ ml: 1 }} />
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity="success"
          onClose={() => setOpenSnackbar(false)}
          sx={{ width: "100%" }}
        >
          Пост успішно створено!
        </Alert>
      </Snackbar>
    </Container>
  );
}
