import { Stack } from "@chakra-ui/react";
import { PostTagDto } from "../../../services/api/models";
import { Copyright } from "../../molecules/copyright";
import { Topics } from "../../molecules/topics";

export function Footer({ data: tags }: { data: PostTagDto[] }) {
  return (
    <Stack spacing="2" mx="auto" pb="4">
      <Topics data={tags} maxW="400px"/>
      <Copyright />
    </Stack>
  );
}
