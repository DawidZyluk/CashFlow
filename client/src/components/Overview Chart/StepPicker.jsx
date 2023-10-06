import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const StepPicker = ({ step, setStep }) => {
  const [value, setValue] = useState(step);

  const styles = {
    input: {
      width: "40px",
      fontSize: '18px',
      border: 'none',
      outline: 'none',
      position: 'relative',
      color: 'inherit',
    },
  };

  const handleChange = (e) => {
    const val = Math.round(e.target.value);
    if(val >= 1 && val < 100) {
      setValue(val)
    }
  }

  useEffect(() => {
    const timeOut = setTimeout(() => setStep(value), 500);
    return () => clearTimeout(timeOut);
  }, [value]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", ml: 3, mr: 1 }}>
      <Typography  sx={{ pr: .4 }}>
        Step:
      </Typography>

      <input
        style={styles.input}
        onChange={handleChange}
        type="number"
        defaultValue={value}
        pattern="[0-9]"
        min={1}
      />
    </Box>
  );
};

export default StepPicker;
