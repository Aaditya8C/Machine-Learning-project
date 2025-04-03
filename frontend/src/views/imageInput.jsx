import React, { useState } from "react";
import { UploadImage } from "../controllers/actions";
import { useNavigate } from "react-router-dom";
import WebcamCapture from "./Components/webCam";

// MUI Components
import { Grid, Container, Button, Typography, Box } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CollectionsIcon from "@mui/icons-material/Collections";

const ImageInput = () => {
  const [landingPage, setLandingPage] = useState(true);
  const [imageSrc, setImageSrc] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]; // Ensure file is defined
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (imageSrc) {
    console.log("Image received, uploading...");
    UploadImage(imageSrc, navigate);
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: 2,
        backgroundColor: "#fff7f0",
        borderRadius: 2,
        boxShadow: 2,
        width: "40%",
        marginTop: 5,
      }}
    >
      <Grid
        container
        justifyContent="center"
        spacing={3}
        sx={{ minHeight: "90vh", alignItems: "center" }}
      >
        {landingPage ? (
          <Grid item xs={12} textAlign="center">
            <Typography variant="h5" fontWeight={600} color="#5c4b51">
              Upload or Capture an Image
            </Typography>

            {/* Capture Photo */}
            <Box mt={3}>
              <PhotoCameraIcon sx={{ fontSize: "4rem", color: "#ff8b6a" }} />
              <Button
                onClick={() => setLandingPage(false)}
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#ff8b6a",
                  "&:hover": { backgroundColor: "#e6735a" },
                }}
              >
                Take a Photo
              </Button>
            </Box>

            {/* Upload File */}
            <Box mt={3}>
              <CollectionsIcon sx={{ fontSize: "4rem", color: "#ffb996" }} />
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  mt: 2,
                  borderColor: "#ff8b6a",
                  color: "#ff8b6a",
                  "&:hover": { borderColor: "#e6735a", color: "#e6735a" },
                }}
              >
                Upload from Gallery
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileUpload}
                />
              </Button>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <WebcamCapture setImageSrc={setImageSrc} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ImageInput;
