import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TodoDetails = () => {
  const params = useParams();
  const [item, setItem] = useState();

  useEffect(() => {
    const items = localStorage.getItem('items');
    if (items) setItem(JSON.parse(items)[params.itemId]);
  }, [params.itemId, item]);

  return (
    <Box sx={{ p: 10 }}>
      <Box
        sx={{
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          border: 2,
          borderColor: 'lightblue',
          borderRadius: 5
        }}
      >
        <Box sx={{ fontSize: 20, fontWeight: '500', pb: 2 }}>Item Details</Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '50%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {item}
        </Box>
      </Box>
    </Box>
  );
};

export default TodoDetails;
