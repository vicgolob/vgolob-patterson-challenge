import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { Badge, Card, createStyles, Group, Image, Text, ActionIcon, Tooltip } from '@mantine/core';

import StarIcon from '../images/estrella.svg';
import CartIcon from '../images/carrito.svg';
import EyeIcon from '../images/ojo.svg';
import { Context } from '../context/CartContext';

const styles = createStyles(() => ({
  'card-top': {
    position: 'relative',
    backgroundColor: 'white',
    display: 'flex',
    padding: '30px 0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'card-bottom': {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 80,
    flexDirection: 'column',
  },
}));

const ProductCard = ({ id, image, title, price, discount, rating }) => {
  const { classes } = styles();
  const [visible, setVisible] = useState(false);
  const { isProductInCart, addToCart } = useContext(Context);

  const buildRating = () => {
    const count = Math.floor(rating);
    return (
      <Group spacing="xs">
        {[...Array(count)].map((x, index) => {
          return <img key={index} src={StarIcon} width={15} height={15} />;
        })}
      </Group>
    );
  };

  return (
    <Card
      my={30}
      bg="none"
      radius={0}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}>
      <Card.Section className={classes['card-top']}>
        <Image src={image} alt={title} width="auto" height={200} mx="auto" py={10} />
        <Group pos="absolute" bottom={15} left={15}>
          {rating && buildRating()}
          {discount && (
            <Badge color="dark" variant="filled">
              -{discount}%
            </Badge>
          )}
        </Group>

        {visible && (
          <Group pos="absolute">
            {!isProductInCart(id) && (
              <Tooltip label="Agregar al Carrito">
                <ActionIcon
                  component="button"
                  onClick={() => addToCart({ id, title, price, image })}
                  variant="light"
                  color="gray"
                  size="xl">
                  <img src={CartIcon} width="60%" height="auto" />
                </ActionIcon>
              </Tooltip>
            )}

            <Tooltip label="Ver Detalle">
              <ActionIcon
                component="button"
                onClick={() => null}
                variant="light"
                color="gray"
                size="xl">
                <img src={EyeIcon} width="60%" height="auto" />
              </ActionIcon>
            </Tooltip>
          </Group>
        )}
      </Card.Section>

      <Card.Section className={classes['card-bottom']}>
        <Text size="sm" weight={500}>
          {title}
        </Text>

        <Text size="lg" weight={700}>
          {price} €
        </Text>
      </Card.Section>
    </Card>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number,
  rating: PropTypes.number.isRequired,
  category: PropTypes.string,
};

export default ProductCard;
