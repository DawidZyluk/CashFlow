import {
  Box,
  Card,
  Container,
  List,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { categories } from "../components/Recent Entries/categories";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useTheme } from "@emotion/react";

const Categories = () => {
  const isNonMobile = useMediaQuery("(min-width:1210px)");
  const isNonSmallMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  return (
    <Box sx={{ mx: isNonMobile ? 17 : 5, my: 5, mb: 10 }}>
      <Typography sx={{ my: 2 }} variant="h4">
        Categories
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isNonSmallMobile
            ? isNonMobile
              ? "repeat(3, 1fr)"
              : "repeat(2, 1fr)"
            : "1fr",
          gridGap: 15,
        }}
      >
        {categories.map(({ id, name, description, examples }) => (
          <Card
            key={id}
            sx={{ display: "flex", flexDirection: "column", p: 2 }}
          >
            <Typography
              sx={{
                fontSize: 26,
              }}
            >
              {name}
            </Typography>
            <Typography sx={{ color: theme.palette.grey[600], mb: 2 }}>
              {description}
            </Typography>
            <Box
              sx={{
                bgcolor: theme.palette.grey[100],
                mt: "auto",
                width: "100%",
                borderRadius: 2,
                // justifySelf: "left",
                p: 1,
              }}
            >
              {examples.map((example) => (
                <Box sx={{ display: "flex", alignItems: "center", my: 0.3 }}>
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: 12,
                      color: theme.palette.grey[700],
                      mx: 1,
                    }}
                  />
                  <Typography>{example}</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Categories;
