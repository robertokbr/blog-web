import { Button, Flex, Icon } from "@chakra-ui/react";
import { LuFilePlus } from "react-icons/lu";
import { UserDto } from "../../../services/api/models";
import { useAuth } from "../../../states/hooks/use-auth";
import { CreatePostModal } from "../../organisms/create-post-modal";

export function CreatePostButton() {
  const { data } = useAuth();
  return (
    <Flex
      placeContent="center"
      position="fixed"
      bottom="10vh"
      right="2.5%"
      display={data?.user?.role === UserDto.role.ADMIN ? "flex" : "none"}
    >
      <CreatePostModal>
        <Button
          w="4rem"
          h="4rem"
          color="purple.400"
          background="gray.800"
          borderRadius="50%"
          _hover={{ background: "gray.800" }}
        >
          <Icon
            as={LuFilePlus}
            w="5"
            h="5"
          />
        </Button>
      </CreatePostModal>
    </Flex>
  );
}
