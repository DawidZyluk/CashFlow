import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const StepPicker = ({ step, setStep }) => {
  const [query, setQuery] = useState(1);

  const styles = {
    input: {
      width: "43px",
      // padding: '3px 6px',
      fontSize: '18px',
      border: 'none',
      outline: 'none',
      position: 'relative',
      color: 'inherit',
      top: 1
    },
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if(val >= 1 && val < 100) {
      setQuery(e.target.value)
    }
  }

  useEffect(() => {
    const timeOut = setTimeout(() => setStep(query), 500);
    return () => clearTimeout(timeOut);
  }, [query]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", ml: 'auto' }}>
      <Typography  sx={{ pr: .4 }}>
        Step:
      </Typography>

      <input
        style={styles.input}
        onChange={handleChange}
        type="number"
        defaultValue={query}
        min={1}
      />
    </Box>
  );
};

export default StepPicker;
