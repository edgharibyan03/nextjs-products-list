'use client';

import { Typography, Paper } from '@mui/material';
import { useMainContext } from '@/contexts/MainContext';
import { useEffect, useState } from 'react';
import { IProduct } from '@/interfaces';

export function ProductPage({ id }: { id: number }) {
  const [product, setProduct] = useState<IProduct | null>(null)

  const { handleGetProduct } = useMainContext()

  const handleSetProduct = async () => {
    const product = await handleGetProduct(id)
    setProduct(product)
  }

  useEffect(() => {
    handleSetProduct()
  },)

  if (!product) return null;

  return (
    <Paper sx={{ maxWidth: 800, margin: '40px auto', p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {product.title}
      </Typography>

      <Typography variant="h6" color="text.secondary" gutterBottom>
        {product.price} ₽
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {product.description}
      </Typography>
    </Paper>
  );
}