import { useCallback, useMemo } from "react";
import { useAuth } from "../../../states/hooks/use-auth";
import { PostContainer } from "../../atoms/post-container";
import { PostContent } from "../../molecules/post-content";
import { PostContentPreview } from "../../molecules/post-content-preview";
import { PostRateControl } from "../../molecules/post-rate-control";
import { PostFooter } from "../../molecules/post-footer";
import { PostDate } from "../../molecules/post-date";
import { PostProps } from "./post.type";
import { Flex } from "@chakra-ui/react";
import { PostOptions } from "../../molecules/post-options";
import { Api } from "../../../services/api";

const api = new Api("Post");

export function Post({
  containerProps,
  isPostPreview,
  data: post,
}: PostProps) {
  const session = useAuth();

  const {
    id,
    tags,
  } = useMemo(() => post, [post]);

  const handlePostRate = useCallback(async (value: number) => {
    return api.createRate({
      postId: id,
      userId: session.data?.user?.id,
      value,
    });
  }, [id, session]);

  const Aside = useMemo(() =>
    <PostRateControl
      data={{ rates: post.rates }}
      handleRate={handlePostRate}
      hideRateControl={!isPostPreview}
      size="md"
    />
  ,[post.rates, handlePostRate, isPostPreview]);

  const PostContentByContext = useMemo(() =>
    isPostPreview
      ? PostContentPreview
      : PostContent,
    [isPostPreview],
  );

  return (
    <PostContainer size="md" {...containerProps} rightSide={Aside}>
      <Flex align="center">
        {isPostPreview && <PostDate data={{ createdAt: post.createdAt, content: post.content }}/>}
        <PostOptions data={post}/>
      </Flex>
      <PostContentByContext data={post} />
      <PostFooter data={{ id: post.id, commentsLength: post.comments.length, tags }}/>
    </PostContainer>
  );
}
