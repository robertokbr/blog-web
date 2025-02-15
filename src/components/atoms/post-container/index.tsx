import {  Flex, Stack } from "@chakra-ui/react";
import { useMemo } from "react";
import { containerUp } from "../../../styles/animations";
import { ChakraDiv } from "../chakra-div";
import { PostContainerProps } from "./post-container.type";

export function PostContainer({
  children,
  stackProps,
  rightSide,
  leftSide,
  size,
  ...props
}: PostContainerProps) {
  const counterSize = useMemo(() => {
    const sizeValues = { md: { minH: 32 }, sm: { minH: 24 } };
    return sizeValues[size];
  }, [size]);

  return (
    <Flex
      as={ChakraDiv}
      p="4"
      bg="gray.800"
      borderRadius="lg"
      minH={counterSize.minH}
      w="100%"
      maxW={656}
      {...props}
      transition="initial"
      {...containerUp}
    >
      {rightSide && rightSide}
      <Stack width="100%" spacing="4" ml={["0", "4"]} overflow="hidden" px="4" {...stackProps}>
        {children}
      </Stack>
      {leftSide && leftSide}
    </Flex>
  );
}
