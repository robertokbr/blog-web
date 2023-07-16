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
          name="Roberto Junior"
          src="https://avatars.githubusercontent.com/u/60328400?v=4"
          border="2px solid #6272a4"
          mb="2"
        />
      </Link>

      {!hideLinks && (
        <HStack spacing="4" mt="4">
          <Link href="https://www.tiktok.com/@rob_kbr" target="_blank" aProps={linkStyle}>
            Tiktok
          </Link>
          <Link href="https://www.youtube.com/channel/UCggY0K1bKT24bWf3cfUBdqw" target="_blank" aProps={linkStyle}>
            Youtube
          </Link>
          <Link href="https://twitter.com/rob_kbr" target="_blank" aProps={linkStyle}>
            Twitter
          </Link>
        </HStack>
      )}
    </Flex>
  );
}
