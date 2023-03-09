import { Flex, Loader } from '@mantine/core';

const PageLoader = () => {
  return (
    <Flex justify="center" align="center" h={300}>
      <Loader />
    </Flex>
  );
};

export default PageLoader;
