import { Box, BoxProps, Icon, Text } from "@chakra-ui/react";
import { ReactElement } from "react";

interface PostIconProps extends BoxProps {
  icon: any; 
  text?: string;
}

export function PostIcon({ icon, text, ...props }: PostIconProps) {
  return (
    <Box 
      display="flex" 
      alignItems="center" 
      mr="4" 
      cursor="pointer" 
      _hover={{ transform: 'scale(1.025)', }}
      transition="0.2s"
      {...props} 
    >
      <Icon as={icon} fontSize={14} color="purple.400"/>
      { text && (
        <Text fontSize="sm" ml="2" color="gray.600">
          {text}
        </Text>
      )}
    </Box>
  );
}