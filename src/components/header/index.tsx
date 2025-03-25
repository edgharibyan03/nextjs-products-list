import { useMainContext } from "@/contexts/MainContext";
import { IProduct } from "@/interfaces";
import { Paper, Typography } from "@mui/material";

export function Header({ data }: { data: IProduct[] }) {
  const { cart } = useMainContext()

  const total = data.reduce((sum, item) => {
    const count = cart[item.id] || 0;
    return sum + item.price * count;
  }, 0);

  return (
    <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h6">Корзина</Typography>
      <Typography>Итого: {total} ₽</Typography>
    </Paper>
  )
}