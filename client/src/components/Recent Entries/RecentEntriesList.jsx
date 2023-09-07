import { Box, Card, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import AddEntry from './AddEntry'
import { useGetEntriesQuery } from '../../store/entriesApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setEntries } from '../../store/authSlice';
import dayjs from 'dayjs';

// import 'dayjs/locale/pl'
// dayjs.locale("pl")

const RecentEntriesList = () => {
  const { data, refetch } = useGetEntriesQuery();
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.auth.entries);

  useEffect(() => {
    refetch();
    dispatch(setEntries({ ...data }));
  }, [data, entries]);

  return (
    <Card sx={{ p: 2, my: 1 }}>
      <Typography sx={{ my: 0 }} variant="h5">
        Recent Entries
      </Typography>
      <Box sx={{  display: 'flex', my: 2, }}>
        {data?.entries.map((entry) => (
          <Card key={entry._id} sx={{p: 2, bgcolor: "rgba(120,190,220,.2)", mr: 2}}>
            <Typography fontWeight="bold">{dayjs(entry.date).format("D MMMM, YYYY")}</Typography>
            <Typography fontWeight='light'>{dayjs(entry.date).format('dddd, HH:mm')}</Typography>
            <Typography fontWeight='light'>{entry.category}</Typography>
            <Typography>${entry.value.toFixed(2)}</Typography>
            <Typography>{entry.note && (entry.note)}</Typography>
          </Card>
        ))}
      </Box>
      <AddEntry />
    </Card>
  )
}

export default RecentEntriesList