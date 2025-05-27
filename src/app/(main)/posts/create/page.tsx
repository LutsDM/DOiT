"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addPost } from "@/features/posts/postSlice";

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
} from "@mui/material";

const steps = ["Заголовок", "Тіло", "Попередній перегляд"];

export default function CreatePostPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      const newPost = {
        id: Date.now(),
        title,
        body,
      };
      dispatch(addPost(newPost));
      setOpenSnackbar(true);
      setTimeout(() => {
        router.push("/posts");
      }, 1500);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Box sx={{ p: 3 }}>
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
          />
        </Box>
      )}

      {activeStep === 2 && (
        <Box sx={{ mt: 3, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            {title || "Без заголовка"}
          </Typography>
          <Typography variant="body1">{body || "Без тексту"}</Typography>
        </Box>
      )}

      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
          Назад
        </Button>
        <Button
          onClick={handleNext}
          variant="contained"
          disabled={
            (activeStep === 0 && !title.trim()) || (activeStep === 1 && !body.trim())
          }
        >
          {activeStep === steps.length - 1 ? "Створити" : "Далі"}
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
    </Box>
  );
}
