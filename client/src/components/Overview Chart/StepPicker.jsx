import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const StepPicker = ({ step, setStep, setIsLoading }) => {
  const [value, setValue] = useState(step);

  const styles = {
    input: {
      width: "40px",
      fontSize: "17px",
      border: "none",
      outline: "none",
      position: "relative",
      color: "inherit",
    },
  };

  const handleChange = (e) => {
    const val = Math.round(e.target.value);
    if (val >= 1 && val < 100) {
      setIsLoading(true);
      setValue(val);
      setStep(val)
    }
  };

  // useEffect(() => {
  //   const timeOut = setTimeout(() => {
  //     setStep(value);
  //   }, 500);
  //   return () => clearTimeout(timeOut);
  // }, [value]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", ml: 2, mr: .2 }}>
      <Typography sx={{ pr: 0.4, fontSize: 16 }}>Step:</Typography>

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
