'use client'

import { Filter } from "@/components/filter";
import { Header } from "@/components/header";
import { Table } from "@/components/table";
import { useMainContext } from "@/contexts/MainContext";
import { Box, Container, Typography } from "@mui/material";

export function HomePage() {
  const {
    products,
    onlyNew,
    setOnlyNew,
    filteredProducts,
    priceRange,
    handlePriceChange,
  } = useMainContext();

  return (
    <>
      <Container component="main" className="home">
        <Header data={products} />
        <Box display="flex">
          <Filter
            handlePriceChange={handlePriceChange}
            onlyNew={onlyNew}
            priceRange={priceRange}
            min={Math.min(...products.map(item => item.price))}
            max={Math.max(...products.map(item => item.price))}
            setOnlyNew={setOnlyNew}
          />
          <Box component="section" flex={1} p={2}>
            <Typography variant="h6">Список товаров</Typography>
            <Table
              data={filteredProducts}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}
