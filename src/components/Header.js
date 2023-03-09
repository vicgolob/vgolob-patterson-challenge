import { useContext } from 'react';
import {
  createStyles,
  Header as _Header,
  Group,
  Stack,
  Text,
  Indicator,
  ActionIcon,
  useMantineTheme,
} from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';

import { Context } from '../context/CartContext';
import CartIcon from '../images/carrito.svg';

const styles = createStyles((theme) => ({
  header: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 120,

    [theme.fn.smallerThan('sm')]: {
      height: 80,
    },
  },
  'header-logo': {
    width: '200px',
    height: 'auto',

    [theme.fn.smallerThan('sm')]: {
      width: 100,
    },
  },
}));

export function Header() {
  const theme = useMantineTheme();
  const { classes } = styles();
  const { getTotalItems, getTotalAfterDiscount } = useContext(Context);
  const navigate = useNavigate();

  return (
    <_Header className={classes.header} px="10%">
      <img
        className={classes['header-logo']}
        src="patterson-agency-logo.png"
        alt="ir a la página de inicio"
      />

      <Group spacing="lg">
        <Indicator
          label={getTotalItems()}
          color={theme.colors.dark}
          styles={{
            indicator: {
              width: '20px !important',
              height: '20px !important',
              borderRadius: '50% !important',
            },
          }}>
          <ActionIcon component="button" onClick={() => navigate('/cart')}>
            <img src={CartIcon} width={40} height="auto" />
          </ActionIcon>
        </Indicator>
        <Stack spacing="xs">
          <Text size="sm">{getTotalAfterDiscount()} €</Text>
          <Link to="/cart">Mi Carrito</Link>
        </Stack>
      </Group>
    </_Header>
  );
}
