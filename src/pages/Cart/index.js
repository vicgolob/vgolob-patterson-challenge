import { useContext, useState } from 'react';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  createStyles,
  Grid,
  Group,
  Input,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconChevronLeft, IconTrash } from '@tabler/icons-react';

import PageContent from '../../components/PageContent';
import { Context } from '../../context/CartContext';

const styles = createStyles(() => ({
  card: {
    borderTop: '3px solid !important',
  },
}));

const Cart = () => {
  const { classes } = styles();
  const {
    cart,
    isCartEmpty,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    discount,
    getDiscount,
    applyDiscount,
    getTotalAfterDiscount,
    clearCart,
  } = useContext(Context);

  const [discountCode, setDiscountCode] = useState('');
  const navigate = useNavigate();
  const emptyCart = isCartEmpty();

  const buildCartProductsList = () => {
    return (
      <>
        <Card withBorder radius={0} shadow="xs" className={classes.card}>
          <Card.Section p={20}>
            <Title transform="uppercase">Carrito</Title>
          </Card.Section>
          <Card.Section p={20} withBorder>
            <Stack spacing={40}>
              {cart.map((item, index) => {
                const { id, image, title, price } = item;
                return (
                  <Group key={index} align="start" position="apart">
                    <img src={image} width="20%" height="auto" />

                    <Text w={{ base: 300, md: 200 }} weight={500} size="lg" ta="left">
                      {title}
                    </Text>

                    <Text weight={500} size="lg" ta="right">
                      {price} €
                    </Text>

                    <Tooltip label="Quitar del Carrito">
                      <ActionIcon component="button" onClick={() => removeFromCart(id)} color="red">
                        <IconTrash />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                );
              })}
            </Stack>
          </Card.Section>
        </Card>
        <Button
          leftIcon={<IconChevronLeft />}
          variant="subtle"
          mt={30}
          onClick={() => navigate('/showcase')}>
          Seguir comprando
        </Button>
      </>
    );
  };

  const showQuantity = () => {
    const totalItems = getTotalItems();
    if (emptyCart) {
      return 'No hay artículos';
    }
    if (getTotalItems() === 1) {
      return `${totalItems} artículo`;
    } else {
      return `${totalItems} artículos`;
    }
  };

  const buildPriceDetails = () => {
    return (
      <Stack>
        <Group position="apart">
          <Text size="xl" weight={500}>
            {showQuantity()}
          </Text>
          <Text size="xl" weight={500}>
            {getTotalPrice()} €
          </Text>
        </Group>

        {!emptyCart && Boolean(discount) && (
          <>
            <Group position="apart">
              <Text size="xl">Descuento aplicado</Text>
              <Text size="xl">-{applyDiscount()} €</Text>
            </Group>
            <Group position="apart">
              <Text size="xl" weight={500} maw={200}>
                Total luego de descuento
              </Text>
              <Text size="xl" weight={500}>
                {getTotalAfterDiscount()} €
              </Text>
            </Group>
          </>
        )}
      </Stack>
    );
  };

  const buildCartPriceSummary = () => {
    return (
      <>
        <Card withBorder radius={0} shadow="xs" mb={30} className={classes.card}>
          <Card.Section withBorder px={20} py={30}>
            {buildPriceDetails()}
          </Card.Section>
          <Card.Section px={20} py={30}>
            <Stack>
              <Button disabled fullWidth radius={0} p={20} h="auto">
                FINALIZAR COMPRA
              </Button>
              <Button
                disabled={emptyCart}
                fullWidth
                radius={0}
                p={20}
                h="auto"
                onClick={() => clearCart()}>
                LIMPIAR CARRITO
              </Button>
            </Stack>
          </Card.Section>
        </Card>

        <Group position="apart" spacing="xs">
          <Text w={{ base: '100%', sm: 100 }} size="lg">
            Código de Descuento
          </Text>
          <Input
            size="md"
            w={{ base: '100%', sm: 200 }}
            placeholder="Ingresa tu código"
            radius={0}
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase();
              setDiscountCode(e.target.value);
            }}
          />
          <Button
            size="md"
            radius={0}
            disabled={!discountCode}
            onClick={() => getDiscount(discountCode)}>
            APLICAR
          </Button>
        </Group>
      </>
    );
  };

  return (
    <>
      <Box bg="url(/paper-background.jpg)" h={15} />
      <PageContent>
        <Grid justify="space-between">
          <Grid.Col xs={12} md={7}>
            {buildCartProductsList()}
          </Grid.Col>
          <Grid.Col xs={12} md={5}>
            {buildCartPriceSummary()}
          </Grid.Col>
        </Grid>
      </PageContent>
    </>
  );
};

export default Cart;
