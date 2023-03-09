import { useEffect, useState } from 'react';
import PageContent from '../../components/PageContent';
import PageHeading from '../../components/PageHeading';
import ProductsCarousel from '../../components/ProductsCarousel';
import { breadcrumbs } from '../../mocks/breadcrumbMock';

const Showcase = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=4');
        const data = await response.json();
        setProducts(data);
      } catch {
        console.warn('Error: unable to load products');
      }
    };

    getProducts();
  }, []);

  return (
    <PageContent bgImage="paper-background.jpg">
      <PageHeading title="Productos Destacados" links={breadcrumbs} />
      <ProductsCarousel products={products} />
    </PageContent>
  );
};

export default Showcase;
