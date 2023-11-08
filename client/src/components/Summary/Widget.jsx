import { useTheme } from '@emotion/react'
import { Box, Card, Typography } from '@mui/material'
import React from 'react'

const Widget = ({label, value}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "auto",
      }}
    >
      <Typography sx={{ alignSelf: "flex-start", color: theme.palette.grey[800] }}>{label}</Typography>
      <Box sx={{my: 'auto'}}>
        <Typography variant="h4" sx={{color: theme.palette.grey[800]}}>{value}</Typography>
      </Box>
    </Card>
  )
}

export default Widget