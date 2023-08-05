import { Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";

type PostCreatorProps = {
  data: { createdAt: string, content?: string };
}

export function PostDate({ data: { createdAt, content } }: PostCreatorProps) {
  const date = useMemo(() =>
    new Date(createdAt).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  ,[createdAt]);

  const readingTime = useMemo(() => {
    const wordsPerMinute = 200;
    const textLength = content?.split(" ").length || 0;
    const readingTime = Math.ceil(textLength / wordsPerMinute);
    return readingTime;
  }, [content]);

  return (
    <Flex align="center" justify="center" w="100%">
      <Text
        fontSize="smaller"
        color="gray.600"
        display={{ base: 'none' ,sm: 'none', md: 'inherit' }}
      >
        {date}
      </Text>
      <Text
        fontSize="smaller"
        color="gray.600"
        ml="auto"
        display={{ base: 'none' ,sm: 'none', md: 'inherit' }}
      >
        {readingTime} min of reading
      </Text>
    </Flex>
  );
}
