import { ProductPage } from '@/appPages';

export default async function Product({ params }: { params: { id: string } }) {
  const id = (await params).id

  return (
    <ProductPage
      id={+id}
    />
  );
}