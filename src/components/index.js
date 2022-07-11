import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Pagination from '@mui/material/Pagination';
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        py: 2,
        px: 1,
        m: 0.5,
        bgcolor: (theme) => theme.palette.background.paper,
        color: '#173A5E',
        border: '1px solid',
        borderColor: 'lightgray',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx
      }}
      {...other}
    />
  );
}

const Index = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const [data, setData] = useState({
    task: ''
  });

  const [editIndex, setEditIndex] = useState(null);
  const [offsetStart, setOffsetStart] = useState(0);
  const [offsetEnd, setOffsetEnd] = useState(3);
  const [page, setPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    const items = localStorage.getItem('items');
    if (items) {
      setItems(JSON.parse(items));
    }
  }, []);

  const handleSubmit = () => {
    let item = data.task;
    if (editIndex) {
      let temp = items;
      temp[editIndex] = item;
      setItems([...temp]);
    } else setItems([item, ...items]);

    updateLocalStorage([item, ...items]);
    setEditIndex(null);
    setData({ task: '' });
  };

  const handleEdit = (item, index) => {
    setEditIndex(index);
    setData({ ...data, task: item });
  };

  const handleDelete = (index) => {
    const data = items.filter((_, i) => index !== i);
    setItems(data);
    updateLocalStorage(data);
  };

  const updateLocalStorage = (values) => {
    localStorage.setItem('items', JSON.stringify(values));
  };

  const handlePageChange = (event, currentPage) => {
    if (currentPage >= page) {
      setOffsetEnd(currentPage * pageSize);
      setOffsetStart(currentPage * pageSize - pageSize);
    } else {
      setOffsetStart(offsetEnd - currentPage * pageSize);
      setOffsetEnd(offsetStart);
    }
    setPage(currentPage);
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          border: 2,
          borderRadius: 2,
          borderColor: 'lightgray',
          width: '50%',
          mt: 2
        }}
      >
        {/* Heading here ...*/}
        <Box
          sx={{
            px: 3,
            display: 'flex',
            color: 'text.primary',
            fontSize: 35,
            fontWeight: '700'
          }}
        >
          Hi, Welcome!
        </Box>

        {/* Todo Form ...*/}
        <Box
          sx={{
            px: 3,
            py: 2,
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <TextField
            sx={{ width: '75%' }}
            error={false}
            id="outlined-error"
            label="Enter To Do Task."
            onChange={(event) => setData({ ...data, task: event.target.value })}
            value={data.task}
          />
          <Button
            sx={{ width: '20%' }}
            variant="outlined"
            onClick={handleSubmit}
            type="submit"
          >
            SUBMIT
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1
          }}
        >
          {items?.slice(offsetStart, offsetEnd).map((item, i) => (
            <Item key={`${item} ${i}`}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Box>{item}</Box>
                <Box>
                  <InfoIcon onClick={() => navigate(`/items/${i}`)} />
                  <EditIcon
                    data-testid="editBtn"
                    onClick={() => handleEdit(item, i)}
                  />
                  <DeleteIcon
                    data-testid="deleteBtn"
                    onClick={() => handleDelete(i)}
                  />
                </Box>
              </Box>
            </Item>
          ))}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <Stack spacing={2}>
              <Pagination
                count={Math.round(items?.length / pageSize)}
                color="primary"
                page={page}
                onChange={handlePageChange}
              />
            </Stack>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Index;
