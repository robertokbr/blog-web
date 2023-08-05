import { Flex, Image } from "@chakra-ui/react";

export function Char() {
  return (
    <Flex
      position="absolute"
      bottom="0"
      display={{ base: 'none' ,sm: 'none', md: 'inherit' }}
    >
      <Flex position="relative" width="300px" height="300px" overflow="hidden">
        <Flex position="absolute" bottom="-50px" left="-80px">
          <Image src="/static/char.png" width="300px" height="300px" alt="char" />
        </Flex>
      </Flex>
    </Flex>
  );
}
