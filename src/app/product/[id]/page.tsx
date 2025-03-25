import { ProductPage } from '@/appPages';

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return (
    <ProductPage id={id} />
  );
}
