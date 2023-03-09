import PropTypes from 'prop-types';
import { Group, Title, Text, Flex, createStyles } from '@mantine/core';

const styles = createStyles((theme) => ({
  link: {
    '&:hover': {
      color: theme.colors.gray[6],
    },
  },
}));

const PageHeading = ({ title, links }) => {
  const { classes } = styles();

  const buildBreadcrumbs = () => {
    const lastArrayIndex = links.length - 1;
    return links.map((link, index) => {
      return index !== lastArrayIndex ? (
        <Text key={index} className={classes.link} fw="bold" component="a" href={link.href}>
          {link.title}
          <Text span mx={15} inherit>
            /
          </Text>
        </Text>
      ) : (
        <Text key={index} className={classes.link} fw="bold" component="a" href={link.href}>
          {link.title}
        </Text>
      );
    });
  };

  return (
    <Group position="apart">
      <Title>{title}</Title>
      <Flex>{buildBreadcrumbs()}</Flex>
    </Group>
  );
};

PageHeading.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
};

export default PageHeading;
