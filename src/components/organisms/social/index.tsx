import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { PostContainer } from "../../atoms/post-container";
import { SocialProps } from "./social";
import { dracula } from "../../../styles/theme";
import { useCallback } from "react";

const flexStyled = {
  border: "2px solid transparent",
  transition: "0.2s",
  _hover: {
    transform: 'scale(1.01)',
    border: `2px solid ${dracula.Purple}`,
  }
}

const aStyle = {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}

export function Social({
  containerProps,
  icon,
  data: { content, link, title, fallbackLink }
}: SocialProps) {
  const onClick = useCallback(() => {
    window.location.href = link;
    setTimeout(function() {
      console.log('redirecting to fallback link');
      window.location.href = fallbackLink;
    }, 3000);
  }, [fallbackLink, link]);


  return (
    <PostContainer
      size="sm"
      stackProps={{ padding: '0 1rem', margin: '0', ml: '0' }}
      {...containerProps}
      {...flexStyled}
    >
      <Flex h="100%">
        <a
          href={link}
          style={aStyle}
          onClick={onClick}
        >
          <Box>
            <Text color="gray.600" fontSize="sm">{title}</Text>
            <Text fontSize="sm" mt="1" opacity={0.7}>{content}</Text>
          </Box>
          <Icon as={icon} w="6" h="6"/>
        </a>
      </Flex>
    </PostContainer>
  );
}
