'use client';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { IProduct } from '@/interfaces';
import { useMainContext } from '@/contexts/MainContext';
import { useRouter } from 'next/navigation';

const columnsWithCart = (
  cart: Record<number, number>,
  handleAdd: (id: number) => void,
  handleRemove: (id: number) => void
): GridColDef[] => [
    {
      field: 'title',
      headerName: 'Название',
      flex: 1,
      renderCell: (params) => (
        <Typography color="primary" sx={{ textDecoration: 'underline', cursor: 'pointer', height: '100%', display: 'flex', alignItems: 'center' }}>
          {params.value}
        </Typography>
      ),
    },
    { field: 'brand', headerName: 'Бренд', flex: 1, sortable: false },
    { field: 'price', headerName: 'Стоимость', flex: 1 },
    {
      field: 'cart',
      headerName: 'Корзина',
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const id = params.row.id;
        const count = cart[id] || 0;

        if (count === 0) {
          return (
            <Button variant="contained" size="small" onClick={() => handleAdd(id)}>
              Добавить
            </Button>
          );
        }

        return (
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton size="small" onClick={() => handleRemove(id)}>
              <Remove fontSize="small" />
            </IconButton>
            <Typography>{count}</Typography>
            <IconButton size="small" onClick={() => handleAdd(id)}>
              <Add fontSize="small" />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

interface IProps {
  data: IProduct[];
}

export function Table({ data }: IProps) {
  const { cart, handleAdd, handleRemove } = useMainContext()

  const router = useRouter();

  const handleCellClick = (params: { field: string, row: { id: number } }) => {
    if (params.field !== 'cart') {
      const id = params.row.id;
      router.push(`/product/${id}`);
    }
  };

  return (
    <>
      <Paper sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columnsWithCart(cart, handleAdd, handleRemove)}
          onCellClick={handleCellClick}
          disableColumnFilter
          disableColumnMenu
          disableRowSelectionOnClick
          checkboxSelection
          sx={{
            '& .MuiDataGrid-filler': { display: 'none' },
            '& .MuiDataGrid-row': { cursor: 'pointer' }
          }}
        />
      </Paper>
    </>
  );
}
