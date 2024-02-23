import { Avatar, Flex, FlexProps, HStack, Text } from "@chakra-ui/react";
import { Link } from "../../atoms/link";

type BioProps = FlexProps & { hideLinks?: boolean };

const linkStyle = { borderBottom: '2px #6272a4 dashed', color: '#6272a4' };

export function Bio({hideLinks ,...data}: BioProps) {
  return (
    <Flex align="center" justify="center" direction="column" {...data}>
      <Link href="/links">
        <Avatar
          size="xl"
          name="Bero"
          src="https://avatars.githubusercontent.com/u/157736909?v=4"
          border="2px solid #6272a4"
          mb="2"
          bg="black.800"
        />
      </Link>
      {!hideLinks && (
        <HStack spacing="4" mt="4">
          <Link href="https://github.com/meunomeebero" target="_blank" aProps={linkStyle}>
            Github
          </Link>
          <Link href="https://www.youtube.com/channel/UCa7B9LVy_nA2OBy_B6zXO9w" target="_blank" aProps={linkStyle}>
            YouTube
          </Link>
          <Link href="https://bero.land" target="_blank" aProps={linkStyle}>
            Beroland
          </Link>
        </HStack>
      )}
    </Flex>
  );
}
