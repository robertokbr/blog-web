import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { PostContainer } from "../../atoms/post-container";
import { SocialProps } from "./social";
import { Link } from "../../atoms/link";
import { dracula } from "../../../styles/theme";

const FlexProps = {
  border: "2px solid transparent",
  transition: "0.2s",
  _hover: {
    transform: 'scale(1.01)',
    border: `2px solid ${dracula.Purple}`,
  }
}

export function Social({
  containerProps,
  icon,
  data: { content, link, title }
}: SocialProps) {

  return (
    <PostContainer
      size="sm"
      {...containerProps}
      {...FlexProps}
    >
      <Flex >
        <Link target="__blank" aProps={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }} href={link}>
          <Icon as={icon} w="6" h="6"/>
          <Box ml="4" mr="auto">
            <Text color="gray.600" fontSize="sm">{title}</Text>
            <Text fontSize="sm" mt="1" opacity={0.7}>{content}</Text>
          </Box>
        </Link>
      </Flex>
    </PostContainer>
  );
}
