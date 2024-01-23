import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Grid, Input, InputLabel, TextField } from "@mui/material";

function valuetext(value) {
  return `RS ${value}`;
}

export default function Range() {
  const [value, setValue] = useState([1000, 100000]);
  const [minPrice, setMinPrice] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(100000);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  const handleMinInputChange = (event) => {
    const minValue = parseInt(event.target.value);
    setMinPrice(minValue);
  };

  const handleMaxInputChange = (event) => {
    const maxValue = parseInt(event.target.value);
    setMaxPrice(maxValue);
  };

  useEffect(() => {
    setValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  return (
    <Box>
      <Slider
        sx={{
          width: "50%",
          marginLeft: "20%", // Adjust or remove this property based on your layout needs
        }}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={1000}
        max={100000}
        marks={[
          { value: 1000, label: "RS 1000" },
          { value: 25000, label: "RS 25000" },
          { value: 50000, label: "RS 50000" },
          { value: 75000, label: "RS 75000" },
          { value: 100000, label: "RS 100000" },
        ]}
      />
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ marginTop: "10px" }}
      >
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="minPrice">Minimum Price:</InputLabel>
          <Input
            fullWidth
            size="small"
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={handleMinInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="maxPrice">Maximum Price:</InputLabel>
          <Input
            fullWidth
            size="small"
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={handleMaxInputChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
