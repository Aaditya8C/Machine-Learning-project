import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// mui
import {
  Container,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Button,
  Typography,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

// controllers
import { putForm } from "../controllers/actions";

const skinToneValues = [1, 2, 3, 4, 5, 6];
const skinToneColors = [
  "rgb(249, 245, 236)",
  "rgb(250, 245, 234)",
  "rgb(240, 227, 171)",
  "rgb(206, 172, 104)",
  "rgb(105, 59, 41)",
  "rgb(33, 28, 40)",
];

const skinTypes = ["All", "Oil", "Normal", "Dry"];
const acnes = ["Low", "Moderate", "Severe"];
const otherConcerns = [
  "sensitive",
  "fine lines",
  "wrinkles",
  "redness",
  "pore",
  "pigmentation",
  "blackheads",
  "whiteheads",
  "blemishes",
  "dark circles",
  "eye bags",
  "dark spots",
];

const defaultData = {
  tone: 5,
  type: "Oily",
  acne: "Moderate",
};

const Form = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const initialData = state?.data || defaultData;
  const [currType, setCurrType] = useState(initialData.type);
  const [currTone, setCurrTone] = useState(parseInt(initialData.tone));
  const [currAcne, setAcne] = useState(initialData.acne);

  const [features, setFeatures] = useState(
    otherConcerns.reduce((acc, concern) => ({ ...acc, [concern]: false }), {
      normal: false,
      dry: false,
      oily: false,
      combination: false,
      acne: false,
    })
  );

  const handleFeatureChange = (event) => {
    setFeatures((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleSubmit = () => {
    const updatedFeatures = { ...features };

    // handle skin types
    if (currType === "All") {
      ["normal", "dry", "oily", "combination"].forEach(
        (type) => (updatedFeatures[type] = true)
      );
    } else {
      updatedFeatures[currType.toLowerCase()] = true;
    }

    // handle acne
    if (currAcne !== "Low") updatedFeatures.acne = true;

    // convert booleans to 1/0
    const formattedFeatures = Object.fromEntries(
      Object.entries(updatedFeatures).map(([key, val]) => [key, val ? 1 : 0])
    );

    console.log({
      features: formattedFeatures,
      type: currType,
      tone: currTone,
    });
    putForm(formattedFeatures, currType, currTone, navigate);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Skin Analysis Form
      </Typography>

      <FormControl fullWidth sx={{ mt: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}>
            <InputLabel>Tone</InputLabel>
            <Select
              value={currTone}
              onChange={(e) => setCurrTone(e.target.value)}
              fullWidth
            >
              {skinToneValues.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={3}>
            <div
              style={{
                height: "3rem",
                width: "3rem",
                backgroundColor: skinToneColors[currTone - 1],
                borderRadius: "10%",
                border: "1px solid #ccc",
              }}
            />
          </Grid>
        </Grid>

        <FormLabel sx={{ mt: 4 }}>Skin Type</FormLabel>
        <RadioGroup
          row
          value={currType}
          onChange={(e) => setCurrType(e.target.value)}
        >
          {skinTypes.map((type) => (
            <FormControlLabel
              key={type}
              value={type}
              control={<Radio />}
              label={type}
            />
          ))}
        </RadioGroup>

        <FormLabel sx={{ mt: 3 }}>Acne Severity</FormLabel>
        <RadioGroup
          row
          value={currAcne}
          onChange={(e) => setAcne(e.target.value)}
        >
          {acnes.map((ac) => (
            <FormControlLabel
              key={ac}
              value={ac}
              control={<Radio />}
              label={ac}
            />
          ))}
        </RadioGroup>

        <FormLabel sx={{ mt: 3 }}>Other Skin Concerns</FormLabel>
        <Grid container spacing={1}>
          {otherConcerns.map((concern) => (
            <Grid item xs={6} key={concern}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={features[concern]}
                    onChange={handleFeatureChange}
                    name={concern}
                  />
                }
                label={concern.charAt(0).toUpperCase() + concern.slice(1)}
              />
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </FormControl>
    </Container>
  );
};

export default Form;
