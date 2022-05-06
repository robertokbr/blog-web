import { HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { AiOutlineCaretUp } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { UserDto } from "../../../../services/api/openapi";
import { useAuth } from "../../../../states/hooks/use-auth";
import { CircularIcon } from "../../../atoms/icons/circular-icon";
import { CreatePostModal } from "../../modals/create-post-modal";

/**
 * @summary
 * Buttons inside the header to control pub creation and notifications 
 */
export function HeaderControls() {
  const history = useRouter();
  const { data } = useAuth(); 

  const handleUserLikedPosts = useCallback(() => {
    if (!data?.user) return;
    history.push({
      pathname: "/",
      ...(!history.query.rateValue && {
        query: {
          userId: data?.user?.id,
          rateValue: 1,
        }
      })
    })
  }, [data, history]);

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
          icon={AiOutlineCaretUp} 
          onClick={handleUserLikedPosts}
          iconColor={history.query.rateValue && "pink.400"}
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