import { Avatar, Box, Flex, Text, useToast } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import { GrMoreVertical } from "react-icons/gr";
import { UserDto } from "../../../services/api/models";
import { logger } from "../../../services/logger";
import { useAuth } from "../../../states/hooks/use-auth";
import { useContent } from "../../../states/hooks/use-content";
import { commentDeleted, deleteCommentErrorToast } from "../../../utils/toast";
import { PostIcon } from "../../atoms/post-icon";
import { PostContainer } from "../../atoms/post-container";
import { PostRateControl } from "../../molecules/post-rate-control";
import { Alert } from "../../atoms/alert";
import { CommentProps } from "./comment.type";
import { Api } from "../../../services/api";

const api = new Api("Comment")

export function Comment({
  containerProps,
  data: { user, content, id, rates }
}: CommentProps) {
  const session = useAuth();
  const toast = useToast();
  const loggedUser = useMemo(() => session?.data?.user, [session]);
  const { handleDeletePostComment } = useContent();

  const handleDeleteComment = useCallback(async () => {
    try {
      await api.deleteComment(`${id}`);
      handleDeletePostComment(id);
      toast(commentDeleted);
    } catch (error) {
      logger.error({ error, context: 'PostComment::handleDeleteComment' });
      toast(deleteCommentErrorToast);
    }
  }, [id, toast, handleDeletePostComment]);

  const handleCommentRate = useCallback(async (value: number) => {
    return api.createCommentRate({
      commentId: id,
      userId: session.data?.user?.id,
      value,
    });
  }, [id, session]);

  const LeftSide = useMemo(() =>
    <PostRateControl
      data={{ rates }}
      handleRate={handleCommentRate}
      isDislikeEnabled
      controllSide="right"
      size="sm"
    />
  ,[rates, handleCommentRate]);

  const RightSide = useMemo(() =>
    loggedUser?.id === user?.id || loggedUser?.role === UserDto.role.ADMIN ?
    <Alert
      title="Deletar comentário"
      description="Você deseja deletar este comentário?"
      handler={handleDeleteComment}
    >
      <PostIcon mr="0" mt="2" mb="auto" icon={GrMoreVertical}/>
    </Alert>
    : <></>
  ,[handleDeleteComment, loggedUser?.id, loggedUser?.role, user?.id]);

  return (
    <PostContainer
      rightSide={RightSide}
      size="sm"
      {...containerProps}
      leftSide={LeftSide}
    >
      <Flex>
        <Avatar name={user?.name} src={user?.image} size="sm"/>
        <Box ml="4">
          <Text color="gray.600" mt="1" fontSize="sm">{user?.name}</Text>
          <Text fontSize="sm" mt="1" opacity={0.7}>{content}</Text>
        </Box>
      </Flex>
    </PostContainer>
  );
}
