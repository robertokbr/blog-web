import { HStack } from "@chakra-ui/react";
import { AiOutlineCaretUp } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { UserDto } from "../../../../services/api/openapi";
import { useAuth } from "../../../../states/hooks/use-auth";
import { CircularIcon } from "../../../atoms/icons/circular-icon";
import { CreatePostModal } from "../../modals/create-post-modal";
import { useCallback, useState } from "react";
import { useContent } from "../../../../states/hooks/use-content";
import { useRouter } from "next/router";
import { AxiosAPI } from "../../../../services/api/axios";
/**
 * @summary
 * Buttons inside the header to control pub creation and notifications 
 */
export function HeaderControls() {
  const [isPressed, setIsPressed] = useState(false);

  const { data } = useAuth(); 
  const { setPosts } = useContent();
  const history = useRouter();

  const handleUserLikedPosts = useCallback(async () => {
    if (!data?.user) return;
    setIsPressed(state => !state);
    const client = new AxiosAPI("HeaderControls");
    const foundPosts = await client.getPosts(
      isPressed 
      ? undefined 
      : { userId: `${data?.user?.id}`, rateValue: "1" }
    );
    setPosts(foundPosts);
    if (history.pathname !== "/[tag]") return history.push("/ptbr");
  }, [data?.user, history, isPressed, setPosts]);
  

  return (
    <HStack
      spacing="4"
      pr={[0, "8", "8"]}
      py="1"
      mx="8"
      color="gray.600"
      borderRightWidth={1}
      borderColor="gray.800"
      ml={{ sm: 'auto', md: "8" }}
      display={{ base: "none", sm: "inherit" }}
    >
      {data && (
        <CircularIcon 
          isPressed={isPressed}
          icon={AiOutlineCaretUp} 
          onClick={handleUserLikedPosts}
        />
      )}
      {data?.user?.permission === UserDto.permission.ADMIN && (
        <CreatePostModal>
          <CircularIcon icon={GoPlus} />
        </CreatePostModal>
      )}
    </HStack> 
  );
}