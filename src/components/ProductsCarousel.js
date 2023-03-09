import PropTypes from 'prop-types';
import { Carousel } from '@mantine/carousel';
import { useMantineTheme } from '@mantine/core';

import ProductCard from './ProductCard';

const ProductsCarousel = ({ products }) => {
  const theme = useMantineTheme();

  const slides = products.map((product, index) => (
    <Carousel.Slide key={index}>
      <ProductCard
        id={product.id}
        image={product.image}
        title={product.title}
        price={product.price}
        rating={product.rating.rate}
      />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      my="md"
      slideSize="25%"
      breakpoints={[
        { maxWidth: 'md', slideSize: '50%' },
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      ]}
      slideGap="xl"
      align="start"
      controlSize={40}
      controlsOffset={0}
      loop
      slidesToScroll={1}
      containScroll="trimSnaps"
      styles={{
        control: {
          borderRadius: 0,
          backgroundColor: theme.colors.dark,
          color: 'white',
        },
        controls: {
          right: -20,
          left: -20,
        },
      }}>
      {slides}
    </Carousel>
  );
};

ProductsCarousel.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductsCarousel;
