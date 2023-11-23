import { Flex, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { FaHome, FaPen, FaArchive, FaTrashAlt } from "react-icons/fa";
import { PostDto, UserDto } from "../../../services/api/models";
import { logger } from "../../../services/logger";
import { deletePostErrorToast } from "../../../utils/toast";
import { PostIcon } from "../../atoms/post-icon";
import { Link } from "../../atoms/link";
import { Alert } from "../../atoms/alert";
import { CreatePostModal } from "../../organisms/create-post-modal";
import { useAuth } from "../../../states/hooks/use-auth";
import { Api } from "../../../services/api";
import useSessionStorage from "../../../states/hooks/use-session-storage";
import axios from "axios";

type PostOptionsProps = {
  data: PostDto;
};

const api = new Api("PostOptions");

export function PostOptions ({
  data,
}: PostOptionsProps) {
  const history = useRouter();
  const toast = useToast();
  const { pathname } = useRouter();
  const session = useAuth();
  const token = useSessionStorage('token', session);
  const userRole = useMemo(() => session?.data?.user?.role, [session]);

  const handleDeletePost = useCallback(async () => {
    try {
      await api.deletePost(String(data.id));
      history.push('/')
    } catch (error) {
      logger.error({ error, context: 'PostHeader::handleDeletePost' })
      toast(deletePostErrorToast);
    }
  }, [data.id, history, toast]);

  const handleArchive = useCallback(async () => {
    try {
      await axios.patch('/api/v1/posts/visibility', {
        token,
        postId: data.id,
      });
    } catch (error) {
      logger.error({ error, context: 'PostHeader::handleArchive' })
      toast(deletePostErrorToast);
    }
  }, [token, data.id, toast]);

  return (
    <Flex ml="auto" pl="4">
      {userRole === UserDto.role.ADMIN && (
        <>
          <Alert
            title="Deletar post"
            description="Você deseja deletar este post para sempre?"
            handler={handleDeletePost}
          >
            <PostIcon
              icon={FaTrashAlt}
              text={"Deletar"}
            />
          </Alert>
          <PostIcon
            onClick={handleArchive}
              icon={FaArchive}
              text={"Arquivar"}
            />
          <CreatePostModal post={data}>
            <PostIcon
              icon={FaPen}
              text={"Editar"}
            />
          </CreatePostModal>
        </>
      )}
      {pathname !== '/' && (
        <Link href="/">
          <PostIcon icon={FaHome} text={"Home"}/>
        </Link>
      )}
    </Flex>
  );
}
