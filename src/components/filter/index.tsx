/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, Typography, Slider, FormControlLabel, Switch } from '@mui/material';

interface IProps {
  priceRange: number[],
  setOnlyNew: any,
  onlyNew: boolean,
  min: number,
  max: number,
  handlePriceChange: (event: Event, newValue: number | number[]) => void,
}

export function Filter({
  priceRange,
  setOnlyNew,
  onlyNew,
  max,
  min,
  handlePriceChange,
}: IProps) {
  return (
    <Box p={2} width={250} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Фильтры
      </Typography>

      <Typography variant="subtitle1">Цена от и до</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        step={100}
      />

      <FormControlLabel
        control={
          <Switch
            checked={onlyNew}
            onChange={() => setOnlyNew((prev: boolean) => !prev)}
            color="primary"
          />
        }
        label="Только новинки"
      />
    </Box>
  );
};