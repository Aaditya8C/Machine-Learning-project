import React from "react";

// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import ProductCard from "./Components/ProductCard";
import { useLocation } from "react-router";

const Recommendations = () => {
  const { state } = useLocation();
  const { data } = state;
  const { general, makeup } = data;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Skin Care Section */}
      <Typography
        variant="h4"
        textAlign="center"
        mb={4}
        sx={{ fontWeight: "bold" }}
      >
        Skin Care Recommendations
      </Typography>

      {Object.keys(general).map((type) => (
        <Box
          key={type}
          sx={{ mb: 6, p: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}
        >
          <Typography
            variant="h5"
            mb={3}
            sx={{ color: "#555", textTransform: "capitalize", fontWeight: 500 }}
          >
            {type.replace(/-/g, " ")}
          </Typography>
          <Grid container spacing={3}>
            {general[type].slice(0, 4).map((prod, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ProductCard
                  name={prod.name}
                  brand={prod.brand}
                  image={prod.img}
                  price={prod.price}
                  url={prod.url}
                  concern={prod.concern}
                  sx={{ height: "100%" }} // make sure card fills height
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      <Divider sx={{ my: 6 }} />

      {/* Makeup Section */}
      <Typography
        variant="h4"
        textAlign="center"
        mb={4}
        sx={{ fontWeight: "bold" }}
      >
        Makeup Recommendations
      </Typography>

      <Box sx={{ p: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
        <Grid container spacing={3}>
          {makeup.map((prod, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ProductCard
                name={prod.name}
                brand={prod.brand}
                image={prod.img}
                price={prod.price}
                url={prod.url}
                concern={prod.concern}
                sx={{ height: "100%" }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Recommendations;
