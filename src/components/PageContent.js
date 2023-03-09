import PropTypes from 'prop-types';
import { Container, createStyles } from '@mantine/core';

const styles = createStyles((theme, { bgImage }) => ({
  root: {
    backgroundImage: bgImage ? `url(/${bgImage})` : null,
    height: '100vh',
  },
}));

const PageContent = ({ bgImage, children }) => {
  const { classes } = styles({ bgImage });

  return (
    <Container fluid className={classes.root} pt={20} pb={40} px={{ base: '5%', sm: '10%' }}>
      {children}
    </Container>
  );
};

PageContent.propTypes = {
  bgImage: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default PageContent;
