import { Badge, Box, BoxProps } from "@chakra-ui/react"
import { useMemo } from "react"
import { PostTagDto } from "../../../services/api/models";
import { containerUp } from "../../../styles/animations";
import { randomDraculaBackground } from "../../../styles/theme"
import { ChakraDiv } from "../../atoms/chakra-div";
import { Link } from "../../atoms/link";

interface TopicsProps extends BoxProps {
  data: PostTagDto[];
}

export function Topics({ data: tags, ...props }: TopicsProps) {
  const uniqueTags = useMemo(() => {
    const tagSet = new Set<string>();


    tags.forEach(t => {
      tagSet.add(t.name.toLowerCase())
    });

    return [...tagSet.values()];
  }, [tags]);

  return (
    <Box display="block" float="none" textAlign="center" {...props}
      as={ChakraDiv}
      {...containerUp}
    >
      {uniqueTags.map(name =>
        <Link href={"/" + name} key={name}>
          <Badge
            margin="0.5"
            fontSize="md"
            cursor="pointer"
            background={randomDraculaBackground()}
          >
            {name}
          </Badge>
        </Link>
      )}
    </Box>
  )
}
