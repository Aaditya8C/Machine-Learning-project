import React, { useState } from "react";
import { UploadImage } from "../controllers/actions";
import { useNavigate } from "react-router-dom";

import WebcamCapture from "./Components/webCam";

// MUI
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CollectionsIcon from "@mui/icons-material/Collections";
import Button from "@mui/material/Button";

function ImageInput() {
  const [landingPage, setLandingPage] = useState(true);
  const [imageSrc, setImageSrc] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (imageSrc !== null) {
    console.log("we got an image");
    UploadImage(imageSrc, navigate);
  }

  return (
    <>
      <Container maxWidth="xs" sx={{ padding: 0 }} alignitems="center">
        <Grid
          container
          justifyContent="center"
          sx={{ maxHeight: "100vh" }}
          spacing={2}
        >
          {landingPage ? (
            <Grid item xs={12} sx={{ margin: "40vh auto" }} textAlign="center">
              <PhotoCameraIcon sx={{ fontSize: "5em" }} />
              <Button
                onClick={() => {
                  setLandingPage(false);
                }}
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Take a photo
              </Button>

              <CollectionsIcon sx={{ fontSize: "5em", mt: 4 }} />
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload from Gallery
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileUpload}
                />
              </Button>
            </Grid>
          ) : (
            <WebcamCapture setImageSrc={setImageSrc} />
          )}
        </Grid>
      </Container>
    </>
  );
}

export default ImageInput;
